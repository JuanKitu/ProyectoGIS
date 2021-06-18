import Parametro from '../models/Parametros';
import Ensayo from '../models/Ensayo';
import { EnsayoInterface, ParametroInterface, colaDatos, colaDual, tiempoRespuesta } from '../interfaces/interfaces';
import { Json } from 'sequelize/types/lib/utils';
import Queue from '../classes/queue';
import { reject, resolve } from 'bluebird';
const fs = require('fs');
import { Observable, Subscription, async } from 'rxjs';
import { col } from 'sequelize/types';
import { isObject } from 'util';
let ensayo: EnsayoInterface;
let estadoScript: number = 1;


process.on('message', async (m) => {
    console.log('INICIANDO PROCESAMIENTO DE PARAMETROS');
    if (typeof (m) == "string") {
        if (m === 'PAUSA') {
            console.log('PAUSANDO EN PARAMETRO');
            estadoScript = 0;
        }
        if (m === 'REANUDAR') {
            console.log('REANUDANDO EN PARAMETRO');
            estadoScript = 1;
        }
    } else {
        ensayo = await m;

        function crearParametro(unDato: number, unaVuelta: number, unTiempo: number, unEnsayo: EnsayoInterface): ParametroInterface {
            if (unEnsayo.carga && unEnsayo.idEnsayo) {
                /* Datos necesarios para la creacion */
                const fuerzaRozamiento = unDato * 9.8;
                const coeficienteRozamiento = fuerzaRozamiento / unEnsayo.carga;
                const idEnsayo = unEnsayo.idEnsayo;
                const tiempoActual = unTiempo;
                const vueltas = unaVuelta
                /*Creando el parametro sin el idParametro, pues eso debe manejarlo la BD*/
                const newParametro: ParametroInterface = {
                    fuerzaRozamiento,
                    coeficienteRozamiento,
                    idEnsayo,
                    tiempoActual,
                    vueltas
                };
                return newParametro;
            }
            /*En caso de que el ensayo no cumpla el if, el parametro es NULL */
            const newParametro: ParametroInterface = {}
            return newParametro;
        };

        function leerJson(ruta: string): colaDatos[] {
            let datos = fs.readFileSync(ruta, 'utf8');
            datos = JSON.parse(datos)["data"];
            return datos;
        };

        const obserbableDatos = new Observable(subscriber => {
            let contador = 1;
            let tiempo: number = 0;
            let colaVueltas: Queue = new Queue();
            let colaFuerzas: Queue = new Queue();
            colaVueltas.copy(leerJson('vueltas.json'));
            colaFuerzas.copy(leerJson('fuerzas.json'));
            const ciclo = () => {
                if (estadoScript === 1) {
                    //console.log('COLA DE VUELTAS: ',colaVueltas.print());
                    //console.log('COLA DE FUERZAS: ',colaFuerzas.print());
                    if (colaFuerzas.size()==0) {
                        colaFuerzas.copy(leerJson('fuerzas.json').filter(fuerza => fuerza.id >= contador));
                    };
                    if (colaVueltas.size()==0) {
                        colaVueltas.copy(leerJson('vueltas.json').filter(vuelta => vuelta.id >= contador));
                    }
                    let unaFuerza = colaFuerzas.peek();
                    let unaVuelta = colaVueltas.peek();
                    //condicion de parada
                    if (unaVuelta.dato == -1) {
                        clearInterval(intervalo);
                        subscriber.complete();
                    }

                    else if (unaFuerza.id == unaVuelta.id) {
                        unaFuerza = colaFuerzas.dequeue();
                        unaVuelta = colaVueltas.dequeue();

                        const newParametro = crearParametro(unaFuerza.dato, unaVuelta.dato, tiempo, ensayo);
                        tiempo += 0.4;
                        contador++;
                        subscriber.next(newParametro);
                    } else if (unaFuerza.id < unaVuelta.id) {
                        for (let i = unaFuerza.id; i == unaVuelta.id || colaFuerzas.isEmpty(); i++) {
                            unaFuerza = colaFuerzas.dequeue();
                        };
                        //controlamos que no sea un resultado vacio
                        if (colaFuerzas.isEmpty()) {
                            colaFuerzas.copy(leerJson('fuerzas.json'));
                            for (let i = unaFuerza.id; i == unaVuelta.id; i++) {
                                unaFuerza = colaFuerzas.dequeue();
                            };
                        }
                        unaFuerza = colaFuerzas.dequeue();
                        unaVuelta = colaVueltas.dequeue();
                        const newParametro = crearParametro(unaFuerza.dato, unaVuelta.dato, tiempo, ensayo);
                        tiempo += 0.4;
                        contador++;
                        subscriber.next(newParametro);
                    } else if (unaFuerza.id > unaVuelta.id) {
                        for (let i = unaVuelta.id; i == unaFuerza.id || colaVueltas.isEmpty(); i++) {
                            unaVuelta = colaVueltas.dequeue();
                        };
                        //controlamos que no sea un resultado vacio
                        if (colaVueltas.isEmpty()) {
                            colaVueltas.copy(leerJson('fuerzas.json'));
                            for (let i = unaVuelta.id; i == unaFuerza.id; i++) {
                                unaVuelta = colaVueltas.dequeue();
                            };
                        }
                        unaVuelta = colaVueltas.dequeue();
                        unaFuerza = colaFuerzas.dequeue();
                        const newParametro = crearParametro(unaFuerza.dato, unaVuelta.dato, tiempo, ensayo);
                        tiempo += 0.4;
                        contador++;
                        subscriber.next(newParametro);

                    }
                }
            }

            const intervalo = setInterval(ciclo, tiempoRespuesta.tiempoMS + 50);




        })
        let i = 1;
        const arregloParametros: any[] = [];
        obserbableDatos.subscribe(data => {
            arregloParametros.push(data);
            /* const datos = {
                unParametro: data,
                arreglo: arregloParametros
            }; */
            //console.log(data);
            (<any>process).send(data);
            i++;
        },
            error => {

            },
            async () => {
                await Parametro.bulkCreate(arregloParametros);
                console.log("finish");
                (<any>process).send('Finalizo el procesamiento de los parametros');
            })


    }


});