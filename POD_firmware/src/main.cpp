#include <Arduino.h>
#include "Globals.h"

DHT dht(DHTPIN, DHTTYPE); //Instancia del sensor de humedad

/*Respuesta a comandos:
CMD   || Respuesta
CONN        0     -> Conectado
STAR        0     -> Exp comenzando
  -        -1     -> Exp terminado
STOP        1     -> Exp detenido  
DCON        0     -> Desconectado  
*/

void setup()
{
  Serial.begin(9600);
  pinMode(ENC_A, INPUT);
  pinMode(ENB, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
  attachInterrupt(digitalPinToInterrupt(ENC_A), readEncoder, RISING); //Interrupción que escucha al encoder
  dht.begin();
}

void loop()
{
  static State state = WAIT;
  static uint8_t isConnected = 0;
  recvWithStartEndMarkers();
  if (newData == true)
  {
    strcpy(tempChars, receivedChars); //Es necesario copiar temporalmente para proteger los datos originales porque strtok() en parseCommand() remplaza las comas con \0
    parseCommand();
    newData = false;
  }
  switch (state)
  {
  case CONN:
  {
    consumeCommand();
    Serial.println("0");
    isConnected = 1;
    state = WAIT;
    break;
  }
  case STAR:
  {
    if (!isRunning)
    {
      resetVars(); //Reinicializa las variables del experimento cuando se empieza un nuevo
      isRunning = 1;
    }
    if (vueltas >= vueltasTarget)
    {
      Serial.println("-1");
      analogWrite(ENB, 0);
      consumeCommand();
      isRunning = 0;
      state = WAIT;
      break;
    }

    if (strcmp(cmd, "PAUS") == 0)
    {
      Serial.println("0");
      analogWrite(ENB, 0);
      state = PAUS;
      break;
    }
    else if (strcmp(cmd, "STOP") == 0)
    {
      state = STOP;
      break;
    }
    else if (strcmp(cmd, "TMHM") == 0)
    {
      getTemperaturaYHumedad(); //Obtengo humedad y temperatura
      consumeCommand();
    }
    else if (strcmp(cmd, "SEND") == 0)
    {
      Serial.println(uint32_t(vueltas));
      consumeCommand();
    }
    uint32_t now = millis();
    if (now - lastTime >= SAMPLE_DELAY)
    {
      calculoVueltasYVelocidad(); //Calculo velocidad cada SAMPLE_DELAY milisegundos
      controlador();              //Computo la salida cada vez que tenga una lectura nueva de la velocidad
      lastTime = now;
    }
    break;
  }
  case PAUS:
  {
    consumeCommand();
    if (strcmp(cmd, "STAR") == 0)
    {
      state = STAR;
      Serial.println("0");
    }
    else if (strcmp(cmd, "STOP") == 0)
    {
      state = STOP;
    }
    break;
  }
  case STOP:
  {
    consumeCommand();
    analogWrite(ENB, 0);
    Serial.println("-1");
    isRunning = 0;
    state = WAIT;
    break;
  }
  case DCON:
  {
    consumeCommand();
    Serial.println("0");
    isConnected = 0;
    resetVars();
    state = WAIT;
    break;
  }
  case WAIT:
  {
    if (strcmp(cmd, "CONN") == 0 && isConnected != 1)
    {
      state = CONN;
    }
    else if (strcmp(cmd, "STAR") == 0 && isConnected == 1 && (radius == 5 || radius == 6 || radius == 7) && vueltasTarget > 0)
    {
      state = STAR;
      if (radius == 5)
      {
        ref = velocidades[0];
      }
      else if (radius == 6)
      {
        ref = velocidades[1];
      }
      else
      {
        ref = velocidades[2];
      }
      Serial.println("0");
    }

    else if (strcmp(cmd, "TEST") == 0 && isConnected == 1)
    {
      state = TEST;
      
    }

    else if (strcmp(cmd, "STOP") == 0 && isConnected == 1) 
    {
      state = STOP;
    }

    else if (strcmp(cmd, "DCON") == 0 && isConnected == 1)
    {
      state = DCON;
    }
    break;
  }
  case TEST:
  {
    test = !test;
    if (test){
      analogWrite(ENB, (unsigned char)(80));
      consumeCommand();
      Serial.println("0");
      state = WAIT;
    }
    else {
      analogWrite(ENB, 0);
      consumeCommand();
      Serial.println("-1");
      state = WAIT;
    }
    
    
  }
}
}

void readEncoder() //Rutina de interrupcion en PIN 3
{
  ++pulseCount;
}

void resetVars()
{
  pulseCount = 0;
  lastTime = 0;
  rpm = 0.0;
  error = 0.0;
  output = 0.0;
  integrat = 0.0;
  previntegrat = 0.0;
  preverror = 0.0;
  deriv = 0.0;
  vueltas = 0.0;
}

void calculoVueltasYVelocidad()
{
  uint16_t pulses;
  cli();
  pulses = pulseCount;
  pulseCount = 0;
  sei();
  rpm = (pulses * (60000.f / (millis() - lastTime))) / PULSES_PER_TURN; //Calculo velocidad
  vueltas += (float)pulses / PULSES_PER_TURN;
}

void controlador()
{
  error = ref - rpm;
  integrat = previntegrat + (preverror / 1000) * SAMPLE_DELAY;
  previntegrat = integrat;
  deriv = (error - preverror) / SAMPLE_DELAY;
  preverror = error;
  output = error * Kp + Ki * integrat + Kd * deriv;
  if (output > 255)
  {
    output = 255;
  }
  if (output < 0)
  {
    output = 0;
  }
  analogWrite(ENB, (unsigned char)(output)); //Cast a unsigned char para salida de 0-255
}

void getTemperaturaYHumedad()
{
  h = dht.readHumidity();
  t = dht.readTemperature();
  if (isnan(h))
  {
    Serial.println("NaN");
  }
  else if (isnan(t))
  {
    Serial.println("NaN");
  }
  Serial.println(h);
  Serial.println(t);
}

void recvWithStartEndMarkers()
{
  static bool recvInProgress = false;
  static uint8_t ndx = 0;
  char startMarker = '<';
  char endMarker = '>';
  char rc;

  while (Serial.available() && !newData)
  {
    rc = Serial.read();

    if (recvInProgress)
    {
      if (rc != endMarker)
      {
        receivedChars[ndx] = rc;
        ndx++;
        if (ndx >= numChars)
        {
          ndx = numChars - 1;
        }
      }
      else
      {
        receivedChars[ndx] = '\0'; //Termino el string
        recvInProgress = false;
        ndx = 0;
        newData = true;
      }
    }

    else if (rc == startMarker)
    {
      recvInProgress = true;
    }
  }
}

void parseCommand()
{ //Esta funcion lee el comando

  char *strtokIndx; //Indice de strtok

  strtokIndx = strtok(tempChars, ","); //Primera parte del mensaje, el comando
  strcpy(cmd, strtokIndx);             //Copio a cmd

  if (strcmp(strtokIndx, "STAR") != 0) //Si no es STAR, no miro mas porque los otros comandos no tienen mas argumentos
  {
    return;
  }

  strtokIndx = strtok(NULL, ","); //Empieza donde dejo la llamada anterior
  radius = atoi(strtokIndx);      //Convierto segundo numero en entero

  strtokIndx = strtok(NULL, ",");
  vueltasTarget = atoi(strtokIndx); //Convierto tercer numero en entero
}

void consumeCommand()
{
  for (int i = 0; i < 5; i++)
  {
    cmd[i] = 0;
  }
}
