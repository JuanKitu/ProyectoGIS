import SerialPort from 'serialport';
import { ParametroInterface, colaDatos, EnsayoInterface, AmbienteInterface, objetoDatos, port, tiempoRespuesta } from '../interfaces/interfaces';
import Queue from '../classes/queue';
import { Observable, Subscription, async } from 'rxjs';
import Ambiente from '../models/Ambiente';
const fs = require('fs');
import moment from 'moment'
import { parse } from 'json2csv';
import { any } from 'bluebird';
const Readline = require('@serialport/parser-readline');
const parser = new Readline()
const colaDato = new Queue();
let fin = false;
let estadoScript: number = 1;

const portControlador = new SerialPort(port.puertoControlador, {
    autoOpen: false,
    baudRate: 9600
});
portControlador.pipe(parser)
console.log('ESTA ABIERTO EL PUERTO EN VUELTAS?: ', portControlador.isOpen);
//portControlador.open();
function crearAmbiente(unaHumedad: number, unaTemperatura: number, unEnsayo: EnsayoInterface): AmbienteInterface {
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
let parada: boolean = false;
process.on('message', async (m) => {
    if (typeof (m) == "object" && m!=null) {
        portControlador.open();
        ensayo = await m;
        console.log('RECIBIENDO ENSAYO');
        const obserbableVueltas = new Observable(subscriberV => {

            const ciclo = () => {
                if (estadoScript === 1) {
                    portControlador.write('<SEND>\n');
                }
                if (parada) {
                    console.log('FINALIZANDO SUSCRIBE');
                    clearInterval(intervalo);
                    subscriberV.complete();
                }
            };
            const intervalo = setInterval(ciclo, tiempoRespuesta.tiempoMS);
            parser.on('readable', () => {
                //setTimeout(() => {
                const data = parser.read();
                if (data) {
                    const arreglo: any = data.toString().match(/\./);
                    if (arreglo === null) {
                        console.log('Data de serialport vuelta1: ', data.toString());
                        console.log('VALOR PARADA2: ', parada);
                        const arreglo2: any = data.toString().match(/\-/);
                        if (arreglo2 != null && fin != true) {
                            console.log(' -------------------------------------------------------------------- INTERPRETANDO -1-------------------------------------------------------------------------------', data.toString());
                            estadoScript = 0;
                            parada = true;
                            subscriberV.next(-1);


                            //SE AGREGA ESTO PARA QUE EN PROCESAMIENTO PARAMETRO SE VERIFIQUE QUE PARADA ES TRUE ANTES DE FINALIZAR EL SCRIPT
                            //DE ESTA FORMA SE EVITA EL BUG DONDE SE INTERPRETA DE FORMA PREMATURA EL -1 EN PROCESAMIENTO PARAMETROS
                            (<any>process).send('PARADA = TRUE');
                        } else {
                            //const arreglo: any = data.toString().match(/\n.*\n/);
                            subscriberV.next(parseFloat(data.toString()));

                        }

                    }


                }

                //}, tiempoRespuesta.tiempoMS + 25)

            });

        })

        let i: number = 0
        const obsVueltas: Subscription = obserbableVueltas.subscribe(data => {
            if (data != 0 && fin != true) {
                i++
                let unDato: colaDatos = {
                    id: i,
                    dato: data
                };
                if (estadoScript != 1) {
                    console.log('AGREGADO -1 A LA COLA');
                    unDato.id = i;
                    unDato.dato = -1
                    colaDato.enqueue(unDato);
                } else {
                    colaDato.enqueue(unDato);
                }
                let datos = colaDato.print();
                let jsonObj = {
                    data: datos
                }
                let jsonContent = JSON.stringify(jsonObj);
                //console.log('CONTENIDO ANTES DE GRABAR: ', jsonContent);
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
                //portControlador.close();
                console.log("FIN EXPERIMENTO");
                (<any>process).send('FIN');

            }
        );



        const obserbableAmbiente = new Observable(subscriberA => {
            let contadorBien: number = 0;
            let constadorMal: number = 0;
            const horaActual: any = moment().format('HH:mm:ss');
            let viejoAmbiente: AmbienteInterface = {
                temperatura: 0,
                humedad: 0,
                horaActual,
                idEnsayo: ensayo.idEnsayo
            };
            const ciclo2 = () => {
                if (!fin) {
                    //if (estadoScript === 1) {
                    console.log('Ejecutando Ambiente');
                    portControlador.write('<TMHM>\n');
                    // }
                } else {
                    clearInterval(intervalo2);
                    subscriberA.complete();
                }
            };
            const ciclo3 = () => {
                if (fin) {
                    clearInterval(intervalo3);
                    clearInterval(intervalo2);
                    subscriberA.complete();
                }
            };
            setTimeout(ciclo2, tiempoRespuesta.tiempoMS + 523);
            const intervalo2 = setInterval(ciclo2, tiempoRespuesta.tiempoMS + 29713);
            const intervalo3 = setInterval(ciclo3, tiempoRespuesta.tiempoMS + 600);
            portControlador.on('readable', () => {
                setTimeout(() => {
                    const data = portControlador.read();
                    if (data) {
                        //console.log('Data de serialport vuelta2: ', data.toString());
                        //console.log('Data de serialport vuelta2 sin toString: ', data);
                        //const arreglo: any = data.toString().match(/\n.*\n/);
                        const arreglo: any = data.toString().match(/\./);
                        const arreglo2: any = data.toString().match(/NaN/);
                        if (arreglo != null) {
                            //console.log('DATA AMBIENTE: ', data.toString());
                            let cadena: string = data.toString();
                            //caso normal de deteccion de cadena con '.'
                            if (cadena.indexOf('.') === 2) {
                                if (arreglo2 === null) {
                                    contadorBien++;
                                    const nuevoAmbiente = crearAmbiente(parseFloat(cadena.substring(0, cadena.indexOf('\r\n'))), parseFloat(cadena.substring(cadena.indexOf('\r\n'))), ensayo);
                                    viejoAmbiente = nuevoAmbiente;
                                    //console.log('OCURRENCIAS CORRECTAS: ', contadorBien);
                                    //console.log('OCURRENCIAS INCORRECTAS: ', constadorMal);
                                    subscriberA.next(nuevoAmbiente);
                                } else {
                                    constadorMal++;
                                    const cadenaModificada = cadena.substring(cadena.indexOf('.') - 2);
                                    //console.log('CADENA MODIFICADA: ',cadenaModificada);
                                    //console.log('OCURRENCIAS CORRECTAS: ', contadorBien);
                                    //console.log('OCURRENCIAS INCORRECTAS: ', constadorMal);
                                    //const nuevoAmbiente = crearAmbiente(parseFloat(cadenaModificada.substring(0, cadenaModificada.indexOf('\r\n'))), parseFloat(cadenaModificada.substring(cadenaModificada.indexOf('\r\n'))), ensayo);
                                    subscriberA.next(viejoAmbiente);
                                }

                            } else { //caso en que se meta una vuelta en la cadena de ambiente
                                constadorMal++;
                                const cadenaModificada = cadena.substring(cadena.indexOf('.') - 2);
                                //console.log('CADENA MODIFICADA: ',cadenaModificada);
                                //console.log('OCURRENCIAS CORRECTAS: ', contadorBien);
                                //console.log('OCURRENCIAS INCORRECTAS: ', constadorMal);
                                //const nuevoAmbiente = crearAmbiente(parseFloat(cadenaModificada.substring(0, cadenaModificada.indexOf('\r\n'))), parseFloat(cadenaModificada.substring(cadenaModificada.indexOf('\r\n'))), ensayo);
                                subscriberA.next(viejoAmbiente);
                            }

                        }
                    }
                }, 500)


            })


        })

        const arregloAmbientes: any[] = [];
        const obsAmbiente: Subscription = obserbableAmbiente.subscribe(data2 => {
            let pasaje: any = data2;
            //console.log(data2);
            if (pasaje.humedad !== undefined && pasaje.temperatura !== undefined) {
                const objeto: objetoDatos = {
                    humedad: pasaje.humedad,
                    temperatura: pasaje.temperatura
                };
                (<any>process).send(objeto);
            }
            arregloAmbientes.push(pasaje);
        },
            (error) => {
                console.log(error)
            },
            async () => {
                await Ambiente.bulkCreate(arregloAmbientes);
                console.log("finish ambiente");
                (<any>process).send('FIN AMBIENTE');

            }
        )

    }
    if (typeof (m) == "string") {
        if (m === "CANCELAR") {
            fin = true;
            portControlador.write('<STOP>\n');
            console.log('CANCELADO EN VUELTAS');
            setTimeout(() => {
                (<any>process).send('CANCELADO');
            }, 100);
            //parser.on('readable',()=>{console.log('Data al cancelar: ',parser.read().toString())})
            /* if (fin != true) {
                console.log('Esta abierto? ', portControlador.isOpen)
                portControlador.write('<STOP>\n');
                console.log('Enviando cancelar');
            }
            parser.on('readable', () => {
                let data = parser.read().toString();
                const arreglo3: any = data.toString().match(/\-/);
                if (arreglo3 != null) {
                    fin = true;
                    console.log('CANCELADO EN VUELTAS');
                    //portControlador.close();
                    (<any>process).send('CANCELADO');
                }
            }); */

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
        if (m === "FIN") {
            fin = true;
            console.log('RECIBIDO FIN');
            //(<any>process).send('REANUDAR');
        }
    }


});