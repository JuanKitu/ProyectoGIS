import SerialPort from 'serialport';
import { port } from './../interfaces/interfaces';
let portControlador = new SerialPort(port.puertoControlador, {
    autoOpen: false,
    baudRate: 9600,
});

portControlador.open();
portControlador.write('<CONN>\n');
portControlador.on('readable', () => {

    const control = portControlador.read();
    if (control) {
        console.log(parseFloat(control.toString()));

        setTimeout(() => {
            console.log("Puerto abierto: ", portControlador.isOpen);
            if (portControlador.isOpen) {
                portControlador.close();
                (<any>process).send(parseFloat(control.toString()));
            }
        }, 1000)


    };
});