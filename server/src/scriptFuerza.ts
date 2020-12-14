import SerialPort from 'serialport';
import { port } from './interfaces/interfaces';
let portCelda = new SerialPort(port.puertoCelda, {
    baudRate: 9600,
});
setInterval(() => {
    portCelda.on('readable', () => {
        console.log(portCelda.read()?.toString());
    });
}, 400)