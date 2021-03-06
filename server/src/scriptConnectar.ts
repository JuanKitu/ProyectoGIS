import SerialPort from 'serialport';
import { port } from './interfaces/interfaces';
let portControlador = new SerialPort(port.puertoControlador, {
    baudRate: 9600,
});

portControlador.write('<CONN>\n');
portControlador.on('readable', () => {
    const control = portControlador.read();
    if (control) {
        console.log(control.toString());
    };
});