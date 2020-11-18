import SerialPort from "serialport";
import { port } from '../interfaces/interfaces';

const portControlador = new SerialPort(port.puertoControlador, {
    baudRate: 9600
});
console.log('Testeando');
portControlador.write('<TEST>\n');
portControlador.on('data',(data)=>{
    console.log(data.toString());
    portControlador.close();
    (<any>process).send('TEST');
});
