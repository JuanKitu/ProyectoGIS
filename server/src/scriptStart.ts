import SerialPort from 'serialport';
import { port } from './interfaces/interfaces';
let portControlador = new SerialPort(port.puertoControlador, {
    baudRate: 9600,
});

portControlador.write('<STAR,5,500>\n');
portControlador.on('readable', () => {
    const control = portControlador.read();
    if (control) {
        console.log(control.toString());
    };
});