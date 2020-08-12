import SerialPort from 'serialport';
const { fork } = require('child_process');
import Ensayo from '../models/Ensayo'
import { EnsayoInterface } from '../interfaces/interfaces';


const portControlador = new SerialPort('COM4', {
    autoOpen: false,
    baudRate: 9600
  })



async function conectar(portControlador:SerialPort) {
    let promesa = new Promise((resolve,reject) => {
        portControlador.write('<CONN>\n')
        portControlador.on('readable',()=>{
        const control = portControlador.read();
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




async function comenzarExperimeto(puerto:SerialPort,idEnsayo:number){
    
    const ensayo = await Ensayo.findOne({
        where:{
            idEnsayo
        },
        raw: true
    });
    
    try{
        if (ensayo){
            if(ensayo.distanciaTotal && ensayo.radioTrayectoria){
                //console.log (ensayo)
                const distancia:number = ensayo.distanciaTotal;
                const unRadio:number = ensayo.radioTrayectoria;
                const vueltas:number = Math.round(distancia/(2*Math.PI*(unRadio/1000)));
                puerto.open();
                console.log('Vueltas',vueltas);
                conectar(portControlador).then(data=>{
                    console.log('Vueltas2');
                iniciar(unRadio,vueltas,puerto).then(data2=>{
                    console.log('Vueltas3');
                    const childFuerza = fork('SerialportFuerza.js');
                    const childVuelta = fork('SerialportVueltas.js');
                    //const ensayoEnviar:EnsayoInterface= ensayo;
                    setTimeout(() => {const childParametros = fork('procesamientoParameros.js'); childParametros.send({ensayo}); 
                    childParametros.on('message',(FinP:any)=>{
                        console.log(FinP);
                        childParametros.kill();
                    })},1000);
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
        };
    }catch(error){
        console.log(error)
    }
    
}


comenzarExperimeto(portControlador,19);