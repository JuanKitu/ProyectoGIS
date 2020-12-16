import SerialPort from 'serialport';
import { port } from './interfaces/interfaces';
let portCelda = new SerialPort(port.puertoCelda, {
    baudRate: 9600,
});
portCelda.on('readable', () => {
    //console.log(data);
    const data = portCelda.read();
    if (data) {
        data.toString().length;
        let arreglo:any = data.toString().match(/\./);
        if(arreglo!=null){
            data.toString().length;
            console.log(data.toString().substring(3,8));
            console.log(parseFloat(data.toString().substring(3,8)));
        }
        
    } else {
        console.log("NULLL")
    }

});