import SerialPort from 'serialport';
import { port } from './interfaces/interfaces';
let portControlador = new SerialPort(port.puertoControlador, {
    autoOpen: false,
    baudRate: 9600,
});

portControlador.open();
portControlador.write('<STAR,5,5000>\n');
portControlador.on('readable', () => {
    const control = portControlador.read();
    if (control) {
        console.log(parseFloat(control.toString()));
        console.log('FUNCIONO');
        portControlador.close();
        (<any>process).send(parseFloat(control.toString()));
    };
});