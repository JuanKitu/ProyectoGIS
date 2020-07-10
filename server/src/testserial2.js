const SerialPort = require('serialport')
const port = new SerialPort('COM6', {
  baudRate: 9600
})
port.write('<CONN>')
port.write(Buffer.from('<CONN>'))