import SerialPort from 'serialport';
import Parametros from '../models/Parametros';
import { ParametroInterface, colaDatos } from '../interfaces/interfaces';
import { any } from 'sequelize/types/lib/operators';
import { reject, resolve } from 'bluebird';
import { Primitive } from 'sequelize/types/lib/utils';
import Queue from '../classes/queue';
import { Observable, Subscription } from 'rxjs';
import clc from 'cli-color';
import { Console } from 'console';
const fs = require('fs');
const colaDato= new Queue();

const portCelda = new SerialPort('COM5', {
    baudRate: 9600
  });


const obserbableFuerza = new Observable(subscriber=>{
    portCelda.on('data',(data) => {
        subscriber.next(parseFloat(data.toString().substring(8)));
    
    });
})


let i:number=0
const youtube:Subscription =obserbableFuerza.subscribe(data=>{
        
    if(data ==-1){
        i++
        let unDato:colaDatos={
            id:i,
            dato:-1
        };
        colaDato.enqueue(unDato);
        console.log(unDato);
        console.log(colaDato.print());
        let datos = colaDato.print();
        let jsonObj = {
            data:datos
        }
        let jsonContent = JSON.stringify(jsonObj);
        
        //console.log(jsonContent)

            fs.writeFile('fuerzas.json',jsonContent,'utf8',function(err:any) {
                if(err){
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
                //console.log("JSON file has been saved.");
            });
        //clearInterval(inter);
        portCelda.close();

        (<any> process).send('Finalizo el script de Fuerza');
        
        youtube.unsubscribe();
        
    }else{
        i++
        let unDato:colaDatos={
            id:i,
            dato:data
        };
        colaDato.enqueue(unDato);
        let datos = colaDato.print();
        let jsonObj = {
            data:datos
        }
        let jsonContent = JSON.stringify(jsonObj);
        
        //console.log(jsonContent)

            fs.writeFile('fuerzas.json',jsonContent,'utf8',function(err:any) {
                if(err){
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
                //console.log("JSON file has been saved.");
            });
    }
})
