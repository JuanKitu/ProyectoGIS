var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var portName = process.argv[2];

var myPort = new SerialPort(portName,{
    baudRate:9600,
    parser:serialport.parsers
})

myPort.on('open',onOpen);
myPort.on('data',onData);

function onOpen(){
    console.log("Open connetion");
}

function onData(data){
    console.log("on Data "+data);
}