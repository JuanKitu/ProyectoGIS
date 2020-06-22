# Protocolo de comunicacion del controlador
Arduino Uno se comunica por el puerto serial a un *baudrate* de 9600. Toda la comunicacion y el comando se realizará por este medio. 
# Tabla de contenidos
1. [Comandos](#comandos) 
   1. [CONN Y DCON](#CONN%20Y%20DCON)
   2. [STAR](#STAR)
   3. [PAUS](#PAUS) 
   4. [STOP](#STOP)
   5. [TEST](#TEST)
   6. [SEND](#SEND)
   7. [TMHM](#TMHM)
2. [Experimento](#experimento) 



## Comandos
---
Todos los comandos se envían con `<` y `>` como caracteres de inicio y fin de comando. Los comandos son:
* CONN
* STAR
* PAUS
* STOP
* DCON
* TEST
* SEND
* TMHM

### CONN y DCON
---
Para que el controlador comience a escuchar comandos desde el cliente, es necesario establecer la conexión serial primero. Para esto utilizamos `<CONN>`. Una vez finalizados los experimentos, de ser necesario, cerramos la conexión con `<DCON>`. 


 Comando | Respuesta | Descripción
 :---: | :---: | :---: 
 `<CONN>` | `0\n` | Conectado
 `<CONN>` | `1\n` | Conexión ya establecida
 `<DCON>` | `0\n` | Desconectado

### STAR
***
Es el único comando puede requerir parámetros. Adopta la forma:
`<STAR,radio,vueltas>`, donde el radio se expresa en milímetros y puede tomar el valor de ***5, 6 o 7***, enteros, y vueltas se expresa en revoluciones, entero, y define la duración del experimento.  
Comando | Respuesta | Descripción
 :---: | :---: | :---: 
 `<STAR,5,3000>` | `0\n` | Empezar experimento de radio ***5mm*** y ***3000rev*** de recorrido total.
`<STAR>` | `0\n` | Experimento reanudado. Uso en conjunto con `<PAUS>`

 ### PAUS
 ***
 Detiene el experimento sin reiniciarlo, con posibilidad de reanudarlo con el comando `<STAR>`.
 Comando | Respuesta | Descripción
 :---: | :---: | :---: 
 `<PAUS>` | `0\n` | Experimento pausado

### STOP
***
Detiene el experimento y reinicia las variables de control, no siendo posible reanudarlo. Si el experimento se encuentra en pausa, enviar este comando reiniciará las variables de la misma forma que si estuviera en curso.

Comando | Respuesta | Descripción
 :---: | :---: | :---: 
 `<STOP>` | `-1\n` | Experimento detenido

### TEST
***
Hace girar el motor sin control de velocidad, para alinear la probeta antes de cada experimento. Funciona como switch. Enviar `<TEST>` la primera vez hará que el motor gire de forma indeterminada, y enviar `<TEST>` una vez mas lo detendra.

 Comando | Respuesta | Descripción
 :---: | :---: | :---: 
 `<TEST>` | `0\n` | Comienza test
 `<TEST>` | `-1\n` | Fin test

 ### SEND
 ***
 Comando de request al controlador. Cada vez que llegue un dato de la celda de carga, deberá enviarse este comando al controlador para que envíe el número de vueltas acumuladas en ese instante.

 Comando | Respuesta | Descripción
 :---: | :---: | :---: 
 `<SEND>` | `2400\n` | Devuelve número de vueltas como entero

 ### TMHM
 ***
 Comando de request de valores de temperatura y humedad al controlador.

 Comando | Respuesta | Descripción
 :---: | :---: | :---: 
 `<TMHM>` | `55\n25.5\n` | Devuelve humedad relativa como entero y temperatura como float separados por `\n`
 `<TMHM>` | `NaN\nNan\n` | Si cualquiera de los dos valores fuera `NaN`, error del sensor

## Experimento
***
Para comenzar un experimento y luego obtener los datos necesarios del controlador, seguimos la siguiente secuencia:
1. Enviamos `<CONN>`, si el controlador responde un `0`, 
2. Enviamos `<STAR,radio,vueltas>` con los datos del experimento. Si el controlador responde un `0`, entonces el experimento comenzó.
3. Espero a que lleguen los datos de la celda de carga de forma sincrónica (2.5 datos por segundo). Cada vez que un nuevo dato llega, enviamos `<SEND>` al controlador para obtener el numero de vueltas.
4. Cada t segundos (t=60 sugeridos) enviamos `<TMHM>` para obtener humedad relativa y temperatura. 
5. Cuando el experimento termine (alcanzó el número de vueltas), el controlador enviará `-1` y quedará listo para comenzar un experimento nuevo (desde el paso 2).