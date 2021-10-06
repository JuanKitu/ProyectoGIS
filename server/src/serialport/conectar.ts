import SerialPort from 'serialport';
import { port } from './../interfaces/interfaces';
let portControlador = new SerialPort(port.puertoControlador, {
    autoOpen: false,
    baudRate: 9600,
});

portControlador.open();
portControlador.write('<CONN>\n');
portControlador.on('data', (data) => {

    const control = data;
    console.log('data conectar.ts', control.toString());
    if (control) {
        if (control == 0 || control == 1) {
            if (portControlador.isOpen) {
                portControlador.close();
                (<any>process).send(parseFloat(control.toString()));
            }
        }

    };
});

portControlador.on('data', (data) => {
    const control = data;
    if (control) {
        portControlador.close();
    }
    else return -2;
});