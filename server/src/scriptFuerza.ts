import SerialPort from 'serialport';
import { port } from './interfaces/interfaces';
const Readline = require('@serialport/parser-readline');
const parser = new Readline()
let portCelda = new SerialPort(port.puertoCelda, {
    baudRate: 9600,
});
portCelda.pipe(parser)
parser.on('data', (data:any) => {
    console.log(data);
    if (data) {
        data.toString().length;
        let arreglo:any = data.match(/\./);
        if(arreglo!=null){
            data.toString().length;
            console.log(data.substring(3,9));
            console.log(parseFloat(data.substring(3,9)));
        }
        
    } else {
        console.log("NULLL")
    }

});