const SerialPort = require('serialport')

const port = new SerialPort('COM4', {
  baudRate: 9600
})

function velocidad() {
  port.write('<SEND>\n');
}

function inicio() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve( solicitarVelocidad() );
    }, 2000);
  })
 
}

function solicitarVelocidad() {
  port.write('<STAR,5,30000>\n');
  setInterval(velocidad, 400);
}

async function conectar() {
 port.write('<CONN>\n');
 const result = await inicio();
 console.log(result);
}

conectar();
port.on('readable',() => console.log(parseFloat(port.read().toString())))