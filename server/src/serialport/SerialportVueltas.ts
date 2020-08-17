import SerialPort from 'serialport';
import { ParametroInterface, colaDatos } from '../interfaces/interfaces';
import { any } from 'sequelize/types/lib/operators';
import { reject, resolve } from 'bluebird';
import { Primitive } from 'sequelize/types/lib/utils';
import Queue from '../classes/queue';
import { Observable, Subscription } from 'rxjs';
import clc from 'cli-color';
const fs = require('fs');
const colaDato= new Queue();



const portControlador = new SerialPort('COM4', {
    baudRate: 9600
});

const obserbableVueltas = new Observable(subscriber=>{
    const ciclo= ()=>{
        portControlador.write('<SEND>\n');
    };
    const intervalo = setInterval(ciclo,400);
    portControlador.on('data',(data)=>{
        
        if(parseFloat(data.toString())===-1){
            i++
            let unDato:colaDatos={
             id:i,
             dato:-1
            };
        colaDato.enqueue(unDato);
        let datos = colaDato.print();
        let jsonObj = {
            data:datos
        }
        let jsonContent = JSON.stringify(jsonObj);
        fs.writeFile('vueltas.json',jsonContent,'utf8',function(err:any) {
            if(err){
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
        });
            clearInterval(intervalo);
            portControlador.close();
            (<any> process).send('Finalizo el script de Vueltas');
            subscriber.complete();
        }else{
            subscriber.next(parseFloat(data.toString()));
        }
    });
    
})


let i:number=0
const youtube:Subscription =obserbableVueltas.subscribe(data=>{
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
        fs.writeFile('vueltas.json',jsonContent,'utf8',function(err:any) {
            if(err){
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
        });
},
(error)=>{
    console.log(error)
},
()=>{
    console.log("finish");

})
