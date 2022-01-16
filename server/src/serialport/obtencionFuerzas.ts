import SerialPort from 'serialport';
import { ParametroInterface, colaDatos, port, tiempoRespuesta } from '../interfaces/interfaces';
import Queue from '../classes/queue';
import { Observable, Subscription } from 'rxjs';
const fs = require('fs');
const Readline = require('@serialport/parser-readline');

const parser = new Readline()
const colaDato = new Queue();
let estadoScript: number = 1;

const portCelda = new SerialPort(port.puertoCelda, {
    baudRate: 9600
});
portCelda.pipe(parser);
const obserbableFuerza = new Observable(subscriber => {
    parser.on('data', (data: any) => {
        if (data) {
            let arreglo: any = data.match(/\./);
            if (arreglo != null) {
                subscriber.next(parseFloat(data.substring(3, 9)));
            }
        }
    });

})

let i: number = 0
/* const youtube: Subscription = */
obserbableFuerza.subscribe(data => {
    if (estadoScript === 1) {
        i++
        let unDato/* : colaDatos */ = {
            id: i,
            dato: data
        };
        (<any>process).send(unDato);

        //colaDato.enqueue(unDato);
        /* let datos = colaDato.print();
        let jsonObj = {
            data: datos
        }
        let jsonContent = JSON.stringify(jsonObj);

        //console.log(jsonContent)

        fs.writeFile('fuerzas.json', jsonContent, 'utf8', function (err: any) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
        }); */
    }
})
