import SerialPort from 'serialport';
const { fork } = require('child_process');
import Ensayo from '../models/Ensayo'
import { EnsayoInterface } from '../interfaces/interfaces';
import Server from '../classes/server';


let servidor:Server = Server.instance;

let portControlador = new SerialPort('COM4', {
    autoOpen: false,
    baudRate: 9600,
});


async function conectar(puerto:SerialPort) {
    let promesa = new Promise((resolve,reject) => {
        puerto.write('<CONN>\n')
        puerto.on('readable',()=>{
        const control = puerto.read();
        if(control) {
            return resolve(parseFloat(control.toString()));
            
            }   
            else return -1; 
        });
    })
    
    
    return promesa;
}

async function iniciar(radio: number,vueltas: number,puerto:SerialPort) {
    let promesa = new Promise((resolve)=>{
        puerto.write('<STAR,'+radio+','+vueltas+'>\n');
        puerto.on('data',(data)=>{
            const control = data;
            if(control) {
                return resolve(parseFloat(control.toString()));
            }
            else return -2; 
        });
    })
    
    
    return promesa;
}




async function comenzarExperimeto(puerto:SerialPort,ensayo:Ensayo){
        if(ensayo.distanciaTotal && ensayo.radioTrayectoria){
            const distancia:number = ensayo.distanciaTotal;
            const unRadio:number = ensayo.radioTrayectoria;
            const vueltas:number = Math.round(distancia/(2*Math.PI*(unRadio/1000)));
            puerto.open();
            console.log('Vueltas',vueltas,puerto.isOpen);
            conectar(puerto).then(data=>{
                console.log('Vueltas2');
                iniciar(unRadio,vueltas,puerto).then(data2=>{
                    console.log('Vueltas3');
                    const childFuerza = fork('dist/serialport/SerialportFuerza.js');
                    const childVuelta = fork('dist/serialport/SerialportVueltas.js');
                    setTimeout(() => {const childParametros = fork('dist/serialport/procesamientoParameros.js'); childParametros.send(ensayo); 
                        childParametros.on('message',(M:any)=>{
                            if(typeof(M)=="object"){
                                (<any> process).send(M);
                            }
                            if(typeof(M)=="string"){
                                //console.log(M);
                                childParametros.kill();
                                (<any> process).send('Parametros agregados satisfactoriamente');
                            }
                            
                        })
                    },1000);
                    childFuerza.on('message',(FinF:any)=>{
                        console.log(FinF);
                        childVuelta.kill();
                    })
                    childVuelta.on('message',(FinV:any)=>{
                        console.log(FinV);
                        childFuerza.kill();
                    })
                    puerto.close();
                })
            }); 
                
            
              
        };
    
    }

process.on('message',async (m)=>{
    await comenzarExperimeto(portControlador,m);
});