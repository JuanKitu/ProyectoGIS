#include "Globals.h"

DHT dht(DHTPIN, DHTTYPE); //Instancia del objeto sensor de humedad

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
  static byte isConnected = 0;
  recvWithStartEndMarkers();
  if (newData == true)
  {
    strcpy(tempChars, receivedChars); //Es necesario copiar temporalmente para proteger los datos originales porque strtok() en parseData() remplaza las comas con \0
    parseData();
    newData = false;
  }

  switch (state)
  {
  case CONN:
    Serial.println("Connected");
    isConnected = 1;
    state = WAIT;
    break;

  case STAR:
    static boolean isRunning = 1;
    if (vueltas >= vueltas_tgt)
    {
      ref = 0; //Freno el motor
      while ((int)rpm > 0)
      {
        calculoVyV();
        controlador();
      }
      state = STOP;
      break;
    }
    if (!isRunning)
    {
      resetVars(); //Reinicializa las variables del experimento cuando se empieza un nuevo
    }
    if (strcmp(cmd, "PAUS") == 0)
    {
      Serial.println("Experiment paused");
      ref_aux = ref; //Guardo la velocidad del experimento
      ref = 0;       //Freno el motor
      while ((int)rpm > 0)
      {
        calculoVyV();
        controlador();
      }
      state = PAUS;
      break;
    }
    else if (strcmp(cmd, "STOP") == 0)
    {
      ref = 0; //Freno el motor
      while ((int)rpm > 0)
      {
        calculoVyV();
        controlador();
      }
      state = STOP;
      break;
    }
    else if (strcmp(cmd, "TMHM") == 0)
    {
      getTyH(); //Obtengo humedad y temperatura
    }
    else if (strcmp(cmd,"SEND")) {
      Serial.println(vueltas);
    }
    if ((unsigned int)millis() - lastTime >= SAMPLE_DELAY)
    {
      calculoVyV();  //Calculo velocidad cada SAMPLE_DELAY milisegundos
      controlador(); //Computo la salida cada vez que tenga una lectura nueva de la velocidad
      lastTime = (unsigned int)millis();
    }
    break;

  case PAUS:
    if (strcmp(cmd, "STAR") == 0)
    {
      state = STAR;
      ref = ref_aux; //Recupero la velocidad del experimento
      Serial.println("Resuming experiment");
    }
    else if (strcmp(cmd, "STOP") == 0)
    {
      state = STOP;
    }
    break;

  case STOP:
    Serial.println("Experiment stopped");
    isRunning = 0;
    state = WAIT;
    break;

  case DCON:
    Serial.println("Disconnect");
    isConnected = 0;
    resetVars();
    state = WAIT;
    break;

  case WAIT:
    if (strcmp(cmd, "CONN") == 0 && isConnected != 1)
    {
      state = CONN;
    }
    else if (strcmp(cmd, "STAR") == 0 && isConnected == 1 && (radius == 5 || radius == 6 || radius == 7) && vueltas_tgt > 0)
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
      Serial.println("Experiment starting");
    }
    else if (strcmp(cmd, "DCON") == 0 && isConnected == 1)
    {
      state = DCON;
    }
    break;
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
  rpm = 0;
  error = 0;
  output = 0;
  integrat = 0;
  previntegrat = 0;
  preverror = 0;
  deriv = 0;
  prevtime = 0;
  vueltas = 0;
  radius = 0;
  vueltas_tgt = 0;
}

void calculoVyV()
{
  unsigned int pulses;
  noInterrupts();
  pulses = pulseCount;
  pulseCount = 0;
  interrupts();
  rpm = (pulses * (60000.f / ((unsigned int)millis() - lastTime))) / PULSES_PER_TURN; //Calculo velocidad
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

void getTyH()
{
  h = dht.readHumidity();
  t = dht.readTemperature();
  if (isnan(h))
  {
    Serial.println("Error leyendo humedad");
  }
  else if (isnan(t))
  {
    Serial.println("Error leyendo temperatura");
  }
  Serial.print("Humedad: ");
  Serial.print(h);
  Serial.print("%\t");
  Serial.print("Temperatura: ");
  Serial.print(t);
  Serial.println(" *C");
}

void recvWithStartEndMarkers()
{
  static boolean recvInProgress = false;
  static byte ndx = 0;
  char startMarker = '<';
  char endMarker = '>';
  char rc;

  while (Serial.available() > 0 && newData == false)
  {
    rc = Serial.read();

    if (recvInProgress == true)
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

void parseData()
{ //Esta funcion lee el comando

  char *strtokIndx; //Indice de strtok

  strtokIndx = strtok(tempChars, ","); //Primera parte del mensaje, el comando
  strcpy(cmd, strtokIndx);             //Copio a cmd
  if (strcmp(strtokIndx, "STAR") != 0)
  {

    return;
  }

  strtokIndx = strtok(NULL, ","); //Empieza donde dejo la llamada anterior
  radius = atoi(strtokIndx);      //Convierto segundo numero en entero

  strtokIndx = strtok(NULL, ",");
  vueltas_tgt = atoi(strtokIndx); //Convierto tercer numero en entero
}
