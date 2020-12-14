import SerialPort from 'serialport';
import { port } from './interfaces/interfaces';
let portControlador = new SerialPort(port.puertoControlador, {
    baudRate: 9600,
});
setInterval(() => {
    portControlador.write('<TMHM>\n');
    portControlador.on('readable', () => {
        setTimeout(() => {
            const control = portControlador.read();
            if (control) {
                const arreglo: any = control.toString().match(/.*/);
                if(arreglo!=null)    console.log(control.toString());
            };
        }, 500)
    
    });
}, 400)
