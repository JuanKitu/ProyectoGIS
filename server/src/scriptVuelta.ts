import SerialPort from 'serialport';
import { port } from './interfaces/interfaces';
let portControlador = new SerialPort(port.puertoControlador, {
    baudRate: 9600,
});
setInterval(() => {
    portControlador.write('<SEND>\n');
    portControlador.on('readable', () => {
        setTimeout(() => {
            const control = portControlador.read();
            if (control) {
                console.log(control.toString());
            };
        }, 400)
    
    });
}, 400)