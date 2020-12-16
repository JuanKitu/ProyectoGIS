import SerialPort from 'serialport';
import { port } from './interfaces/interfaces';
let portCelda = new SerialPort(port.puertoCelda, {
    baudRate: 9600,
});
portCelda.on('data', (data) => {
    //console.log(data);
    if (data) {
        let arreglo:any = data.toString().match(/\./);
        console.log(data.toString());
        console.log(parseFloat(data.toString().substring(8)));
    } else {
        console.log("NULLL")
    }

});