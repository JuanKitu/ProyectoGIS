import SerialPort from 'serialport';
import { ParametroInterface, colaDatos, port, tiempoRespuesta } from '../interfaces/interfaces';
import Queue from '../classes/queue';
import { Observable, Subscription } from 'rxjs';
const fs = require('fs');
const Readline = require('@serialport/parser-readline');

const parser = new Readline()
const colaDato = new Queue();
let estadoScript: number = 1;


console.log("INICIANDO HIJO FUERZAS");
const portCelda = new SerialPort(port.puertoCelda, {
    baudRate: 9600
});
portCelda.pipe(parser);

process.on('message', async (m) => {
    if (typeof (m) == 'string') {
        if (m === 'PAUSA') {
            console.log('PAUSANDO EN FUERZA');
            estadoScript = 0;
        }
        if (m === 'REANUDAR') {
            console.log('REANUDANDO EN FUERZA');
            estadoScript = 1;
        }
    }
})

const obserbableFuerza = new Observable(subscriber => {
    console.log("comenzando obsebavle")
    parser.on('data', (data: any) => {
        if (data) {
            let arreglo: any = data.match(/\./);
            if (arreglo != null) {
                console.log('fuerza recibida: ', parseFloat(data.substring(3, 9)));
                subscriber.next(parseFloat(data.substring(3, 9)));
            }
        }
    });

})

let i: number = 0
console.log("linea antes de obserbavle")
/* const youtube: Subscription = */
obserbableFuerza.subscribe(data => {

    /* if (data == -1) {
        i++
        let unDato: colaDatos = {
            id: i,
            dato: -1
        };
        colaDato.enqueue(unDato);
        let datos = colaDato.print();
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
            //console.log("JSON file has been saved.");
        });
        //clearInterval(inter);
        portCelda.close();

        (<any>process).send('Finalizo el script de Fuerza');

        youtube.unsubscribe();

    } */
    if (estadoScript === 1) {
        i++
        let unDato: colaDatos = {
            id: i,
            dato: data
        };
        console.log("CREANDO FUERZAS.JSON");
        colaDato.enqueue(unDato);
        let datos = colaDato.print();
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
            console.log("JSON file has been saved.");
        });
    }
})
