import SerialPort from 'serialport';
import { ParametroInterface, colaDatos, EnsayoInterface, AmbienteInterface, objetoDatos, port, tiempoRespuesta } from '../interfaces/interfaces';
import { any } from 'sequelize/types/lib/operators';
import { reject, resolve } from 'bluebird';
import { Primitive } from 'sequelize/types/lib/utils';
import Queue from '../classes/queue';
import { Observable, Subscription, async } from 'rxjs';
import clc from 'cli-color';
import { time } from 'console';
import Ambiente from '../models/Ambiente';
const fs = require('fs');
import moment from 'moment'
import { type } from 'os';
const colaDato = new Queue();
let fin = false;
let estadoScript: number = 1;

const portControlador = new SerialPort(port.puertoControlador, {
    //autoOpen:false,
    baudRate: 9600
});


function crearAmbiente(unaTemperatura: number, unaHumedad: number, unEnsayo: EnsayoInterface): AmbienteInterface {
    if (unEnsayo.idEnsayo) {
        /* Datos necesarios para la creacion */
        const temperatura = unaTemperatura;
        const humedad = unaHumedad;
        const horaActual: any = moment().format('HH:mm:ss');
        const idEnsayo = unEnsayo.idEnsayo

        const newAmbiente: AmbienteInterface = {
            temperatura,
            humedad,
            horaActual,
            idEnsayo
        };
        return newAmbiente;
    }
    /*En caso de que el ensayo no cumpla el if, el parametro es NULL */
    const newAmbiente: AmbienteInterface = {}
    return newAmbiente;
};

let ensayo: EnsayoInterface;

process.on('message', async (m) => {
    if (typeof (m) == "object") {
        //portControlador.open();
        ensayo = await m;

        const obserbableVueltas = new Observable(subscriberV => {

            const ciclo = () => {
                if (estadoScript === 1) {
                    portControlador.write('<SEND>\n');
                }
            };
            const intervalo = setInterval(ciclo, tiempoRespuesta.tiempoMS);
            portControlador.on('readable', () => {
                setTimeout(() => {
                    const data = portControlador.read();
                    if (data) {
                        console.log('Data de serialport vuelta1: ', data.toString());
                        if (parseFloat(data.toString()) === -1) {
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
                            fs.writeFile('vueltas.json', jsonContent, 'utf8', function (err: any) {
                                if (err) {
                                    console.log("An error occured while writing JSON Object to File.");
                                    return console.log(err);
                                }
                            });
                            clearInterval(intervalo);
                            subscriberV.complete();
                        } else {
                            //const arreglo: any = data.toString().match(/\n.*\n/);
                            const arreglo: any = data.toString().match(/.*/);
                            if (arreglo === null) {
                                subscriberV.next(parseFloat(data.toString()));
                            }

                        }
                    }

                }, tiempoRespuesta.tiempoMS + 425)

            });

        })

        let i: number = 0
        const youtube: Subscription = obserbableVueltas.subscribe(data => {
            if (data != 0 && estadoScript === 1) {
                i++
                let unDato: colaDatos = {
                    id: i,
                    dato: data
                };
                colaDato.enqueue(unDato);
                //console.log('DATO: ',colaDato.print());
                let datos = colaDato.print();
                let jsonObj = {
                    data: datos
                }
                let jsonContent = JSON.stringify(jsonObj);
                fs.writeFile('vueltas.json', jsonContent, 'utf8', function (err: any) {
                    if (err) {
                        console.log("An error occured while writing JSON Object to File.");
                        return console.log(err);
                    }
                });
            }
        },
            (error) => {
                console.log(error)
            },
            () => {
                fin = true;
                console.log("FIN EXPERIMENTO");
                (<any>process).send('FIN');

            }
        );

        const obserbableAmbiente = new Observable(subscriberA => {
            const ciclo2 = () => {
                if (!fin) {
                    if (estadoScript === 1) {
                        console.log('Ejecutando Ambiente');
                        portControlador.write('<TMHM>\n');
                    }
                } else {
                    clearInterval(intervalo2);
                    subscriberA.complete();
                }
            };
            const intervalo2 = setInterval(ciclo2, tiempoRespuesta.tiempoMS + 4713);

            portControlador.on('readable', () => {
                setTimeout(() => {
                    const data = portControlador.read();
                    if (data) {
                        console.log('Data de serialport vuelta2: ', data.toString());
                        //const arreglo: any = data.toString().match(/\n.*\n/);
                        const arreglo: any = data.toString().match(/.*/);
                        if (arreglo != null) {
                            let cadena: string = data.toString();
                            const nuevoAmbiente = crearAmbiente(parseFloat(cadena.substring(0, cadena.indexOf('\n'))), parseFloat(cadena.substring(cadena.indexOf('\n'))), ensayo);
                            subscriberA.next(nuevoAmbiente);
                        }
                    }

                }, tiempoRespuesta.tiempoMS + 425)

            })


        })




        const arregloAmbientes: any[] = [];
        const youtube2: Subscription = obserbableAmbiente.subscribe(data2 => {
            let pasaje: any = data2;
            if (pasaje.humedad !== undefined && pasaje.temperatura !== undefined) {
                const objeto: objetoDatos = {
                    humedad: pasaje.humedad,
                    temperatura: pasaje.temperatura
                };
                (<any>process).send(objeto);
            }
            arregloAmbientes.push(pasaje);
            //console.log(data);
            //console.log(arregloAmbientes);
        },
            (error) => {
                console.log(error)
            },
            async () => {
                await Ambiente.bulkCreate(arregloAmbientes);
                console.log("finish ambiente");
                //(<any>process).send('FIN');

            }
        )

    }
    if (typeof (m) == "string") {
        if (m === "PAUSA") {
            estadoScript = 0;
            console.log('PAUSANDO EN VUELTA');
            portControlador.write('<PAUS>\n');
            (<any>process).send('PAUSADO');
        }
        if (m === "CANCELAR") {
            portControlador.write('<STOP>\n');
            fin = true;
            console.log('CANCELADO EN VUELTAS');
            portControlador.close();
            (<any>process).send('CANCELADO');
        }
        if (m === "TEST") {
            portControlador.write('<TEST>\n');
            (<any>process).send('TEST');
        }
        if (m === "REANUDAR") {
            portControlador.write('<STAR>\n');
            estadoScript = 1;
            console.log('REANUDANDO EN VUELTA');
            //(<any>process).send('REANUDAR');
        }
    }


});