import SerialPort from 'serialport';
const { fork } = require('child_process');
import Ensayo from '../models/Ensayo'
import { EnsayoInterface, port } from '../interfaces/interfaces';
import Server from '../classes/server';
import { json } from 'express';
import fs from 'fs';


let servidor: Server = Server.instance;
//estadoScript: (0 = DETENIDO) - (1 = CORRIENDO)
let estadoScript: number = 0;

let portControlador = new SerialPort(port.puertoControlador, {
    autoOpen: false,
    baudRate: 9600,
});


async function iniciar(radio: number, vueltas: number, puerto: SerialPort) {
    let promesa = new Promise((resolve) => {
        portControlador.open();
        puerto.write('<STAR,' + radio + ',' + vueltas + '>\n');
        puerto.on('data', (data) => {
            const control = data;
            if (control) {
                portControlador.close();
                return resolve(parseFloat(control.toString()));
            }
            else return -2;
        });
    })


    return promesa;
}




async function comenzarExperimeto(puerto: SerialPort, ensayo: EnsayoInterface) {
    if (ensayo.distanciaTotal && ensayo.radioTrayectoria) {
        const distancia: number = ensayo.distanciaTotal;
        const unRadio: number = ensayo.radioTrayectoria;
        const vueltas: number = Math.round(distancia / (2 * Math.PI * (unRadio / 1000)));
            iniciar(unRadio, vueltas, puerto).then(data2 => {
                estadoScript = 1;
                console.log('---------------------------------------------------------------VUELTAS: ', vueltas);
                if(!fs.existsSync('fuerzas.json')) fs.unlinkSync('fuerzas.json');
                if(!fs.existsSync('vueltas.json')) fs.unlinkSync('vueltas.json');
                const childFuerza = fork('dist/serialport/SerialportFuerza.js');
                const childVuelta = fork('dist/serialport/SerialportVueltas.js');
                childVuelta.send(ensayo);
                childVuelta.on('message', (MV: any) => {
                    if (typeof (MV) == "object") {
                        (<any>process).send(MV);
                    }
                    if (typeof (MV) == "string") {
                        if (MV === "FIN") {
                            console.log('Recibiendo fin de child vuelta')
                            //estadoScript=0;
                            //childVuelta.kill();
                        }
                        if (MV === "FIN AMBIENTE") {
                            console.log('Recibiendo fin de los ambientes')
                            estadoScript=0;
                            childVuelta.kill();
                            (<any>process).send('PARAMETROS AGREGADOS');
                            
                        }
                        if (MV === "CANCELADO") {
                            if(portControlador.isOpen){
                                portControlador.close();
                            }
                            console.log('RECIBIDO CANCELAR DE CHILD');
                            childFuerza.kill();
                            childVuelta.kill();
                            //(<any>process).send('CANCELADO');
                        }
                    }
                })

                setTimeout(() => {
                    const childParametros = fork('dist/serialport/procesamientoParameros.js');
                    childParametros.send(ensayo);
                    childParametros.on('message', (MP: any) => {
                        if (typeof (MP) == "object") {
                            (<any>process).send(MP);
                        }
                        if (typeof (MP) == "string") {
                            childVuelta.send('FIN');
                            //portControlador.close();
                            childFuerza.kill();
                            childParametros.kill();
                            /* setTimeout(()=>{
                                childParametros.kill();
                                //(<any>process).send('PARAMETROS AGREGADOS');
                            },1000) */
                            
                        }

                    });
                    process.on('message', async (me) => {
                        if (typeof (me) == "string") {
                            if (me === "PAUSA") {
                                childFuerza.send("PAUSA");
                                childVuelta.send("PAUSA");
                                childParametros.send("PAUSA");
                            }
                            if (me === "CANCELAR") {
                                if(estadoScript===1) {childVuelta.send("CANCELAR");}
                                childParametros.kill();
                            }
                            if (me === "TEST") {
                                childVuelta.send("TEST");
                            }
                            if(me === "REANUDAR"){
                                childVuelta.send("REANUDAR");
                                childParametros.send("REANUDAR");
                                childFuerza.send("REANUDAR");
                            }
                            if(me === "FINAL"){
                                childVuelta.send("FINAL");
                            }
                        }
                    });

                    childVuelta.on('message', (MV2: any) => {
                        if (MV2 === 'PARADA = TRUE') {
                            childParametros.send("PARADA = TRUE");
                        }
                    });

                }, 1000);

            })



    };

}

process.on('message', async (m) => {
    if (typeof (m) == "object" && m!=null) {
        await comenzarExperimeto(portControlador, m);
    }
});