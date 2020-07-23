const SerialPort = require('serialport')
const port = new SerialPort('COM6', {
  baudRate: 9600
})
// Read data that is available but keep the stream in "paused mode"
port.on('readable', function () {
    console.log('Data:', parseFloat(port.read().toString().substring(8)));
  })
  