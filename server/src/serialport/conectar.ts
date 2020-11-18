import SerialPort from 'serialport';
import { port } from './../interfaces/interfaces';
let portControlador = new SerialPort(port.puertoControlador, {
    autoOpen: false,
    baudRate: 9600,
});

console.log('antes de control');
portControlador.open();
portControlador.write('<CONN>\n');
portControlador.on('readable', () => {
    const control = portControlador.read();
    console.log('despues de control');
    if (control) {
        console.log(parseFloat(control.toString()));
        portControlador.close();
        (<any>process).send(parseFloat(control.toString()));
    };
});