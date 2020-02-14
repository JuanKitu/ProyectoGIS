#include <DHT.h>
#include <DHT_U.h>
#include <Adafruit_Sensor.h>

//Parámetros del encoder
#define SAMPLE_DELAY (200)     //  Calculo la velocidad 1 vez cada 200ms
#define PULSES_PER_TURN (699)  //  Cantidad de pulsos por vuelta, datos de datasheet motor.
#define ENC_A 3                //  Entrada de encoder, indistinto A o B

//Pines del L298
#define IN3 7    // IN3 conectada al pin 8
#define IN4 4    // IN4 conectada al pin 4 
#define ENB 6    // ENB conectada al pin 6 (sin jumper)

//Pines DHT
#define DHTPIN 5
#define DHTTYPE DHT22 //Modelo del sensor

//Variables DHT
float h = 0; //Humedad relativa %
float t = 0; //Temperatura °C

//Variables calculo de velocidad
volatile uint16_t pulseCount;
uint32_t lastTime; 
float rpm;

//Variables controlador
const float Kp = 0.5;
const float Ki = 0.8;
const float Kd = 3;
const  uint8_t velocidades[] = {130, 140, 150}; //Chequear en la maquina cuales son las velocidades del ensayo
uint8_t ref = 0;
uint8_t ref_aux = 0;                 
float error = 0;
float output = 0;
float integrat = 0;
float previntegrat = 0;
float preverror = 0;
float deriv = 0;
uint32_t prevtime = 0;
float vueltas = 0;

//Variables de comunicacion
enum State {CONN, STAR, PAUS, STOP, DCON, WAIT}; //Estados de la FSM
const uint8_t numChars = 32; //Buffer de puerto serial
char receivedChars[numChars];
char tempChars[numChars]; //Array temporal para usar en parseData()     
char cmd[numChars] = {0}; //Comando recibido (State) 
uint8_t radius = 0; //Radio del experimento
uint16_t vueltasTarget = 0; //Vueltas del experimento
bool newData = false; //Flag de llegada de comando


void readEncoder();
void resetVars();
void calculoVueltasYVelocidad();
void controlador();
void getTemperaturaYHumedad();
void recvWithStartEndMarkers();
void parseCommand();

