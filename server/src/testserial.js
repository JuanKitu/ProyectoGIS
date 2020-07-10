const SerialPort = require('serialport')
const port = new SerialPort('COM4', {
  baudRate: 9600
})
// Read data that is available but keep the stream in "paused mode"
port.on('readable', function () {
    console.log('Data:', port.read())
  })
  
  // Switches the port into "flowing mode"
  port.on('data', function (data) {
    console.log('Data:', data)
  })