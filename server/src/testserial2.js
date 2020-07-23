const SerialPort = require('serialport')
const port = new SerialPort('COM4', {
  baudRate: 9600
})

port.write('<STAR,5,100>\n');
port.on('readable', () => console.log('Data:',parseFloat(port.read().toString()) ) )
