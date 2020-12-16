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
                let cadena: string = control.toString();
                
                console.log('HUMEDAD: ',parseFloat(cadena.substring(0, cadena.indexOf('\r\n'))));
                console.log('TEMPERATURA: ',parseFloat(cadena.substring(cadena.indexOf('\r\n'))));
                const arreglo: any = control.toString().match(/.*/);
                console.log(arreglo);
                if(arreglo!=null)    console.log(control.toString());
            };
        }, 500)
    
    });
}, 400)
