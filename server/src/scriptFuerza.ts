import SerialPort from 'serialport';
import { port } from './interfaces/interfaces';
let portCelda = new SerialPort(port.puertoCelda, {
    baudRate: 9600,
});
setInterval(() => {
    portCelda.on('data', (data) => {
        if(data){
            console.log(data.toString());
        }else{
            console.log("NULLL")
        }
        
    });
}, 400)