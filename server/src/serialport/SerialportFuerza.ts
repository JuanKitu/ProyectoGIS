import SerialPort from 'serialport';
import Parametros from '../models/Parametros';
import { ParametroInterface, colaDatos, port, tiempoRespuesta } from '../interfaces/interfaces';
import { any } from 'sequelize/types/lib/operators';
import { reject, resolve } from 'bluebird';
import { Primitive } from 'sequelize/types/lib/utils';
import Queue from '../classes/queue';
import { Observable, Subscription } from 'rxjs';
import clc from 'cli-color';
import { Console } from 'console';
const fs = require('fs');
const colaDato = new Queue();
let estadoScript: number = 1;


console.log("INICIANDO HIJO FUERZAS");
const portCelda = new SerialPort(port.puertoCelda, {
    baudRate: 9600
});

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
    setInterval(()=>{
        portCelda.on('readable', () => {
            const data = portCelda.read();
            console.log("DATA FUERZA:",data);
            if(data){
                console.log('fuerza recibida: ',data.toString());
                subscriber.next(parseFloat(data.toString().substring(8)));
            }
        });
    },tiempoRespuesta.tiempoMS+25)
    
})

let i: number = 0
/* const youtube: Subscription = */ obserbableFuerza.subscribe(data => {

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
    console.log(estadoScript);
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
