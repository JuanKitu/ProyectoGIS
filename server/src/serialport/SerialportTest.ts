import SerialPort from "serialport";
import { port } from '../interfaces/interfaces';

const portControlador = new SerialPort(port.puertoControlador, {
    //autoOpen:false,
    baudRate: 9600
});
portControlador.write('<CONN>\n');
console.log('Testeando');
portControlador.on('data',(data)=>{
    console.log(data.toString());
    portControlador.write('<TEST>\n');
    portControlador.close();
    (<any>process).send('TEST');
});
