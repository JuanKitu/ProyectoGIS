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
    console.log('portControlador.read()',portControlador.read()?.toString());
    if (control) {
        if(control.toString() === '0' || control.toString() === '1'){
            setTimeout(() => {
                if (portControlador.isOpen) {
                    portControlador.close();
                    (<any>process).send(parseFloat(control.toString()));
                }
            }, 1000)
        }

    };
});