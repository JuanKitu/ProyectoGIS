import Parametro from '../models/Parametros';
import { EnsayoInterface, ParametroInterface, tiempoRespuesta } from '../interfaces/interfaces';
import Queue from '../classes/queue';
const fs = require('fs');
import { Observable, Subscription, async } from 'rxjs';
let ensayo: EnsayoInterface;
let estadoScript: number = 1;
let auxParada: boolean = false;


process.on('message', async (m) => {
    console.log('INICIANDO PROCESAMIENTO DE PARAMETROS');
    if (typeof (m) == "object" && m != null) {
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
                console.log('Data crearParametro', newParametro);
                return newParametro;
            }
            /*En caso de que el ensayo no cumpla el if, el parametro es NULL */
            const newParametro: ParametroInterface = {}
            return newParametro;
        };

        function leerJson(ruta: string): any {
            try {
                let datos = fs.readFileSync(ruta, 'utf8');
                let fileDatos = JSON.parse(datos);
                return fileDatos.data;
            } catch (err) {
                console.log(err);
                return -2;
            }

        };


        let colaPruebasVueltas: Queue = new Queue();
        let colaPruebasFuerzas: Queue = new Queue();
        colaPruebasVueltas.copy(leerJson('vueltas.json'));
        colaPruebasFuerzas.copy(leerJson('fuerzas.json'));
        console.log('COLAS PRUEBAS:');
        console.log('vueltas ', colaPruebasVueltas.copy(leerJson('vueltas.json')));
        console.log('fuerzas ', colaPruebasFuerzas.copy(leerJson('fuerzas.json')));
        console.log('---------------------------------------------------------------');
        let colaVueltasAnterior: Queue = new Queue();
        let colaFuerzasAnterior: Queue = new Queue();
        const obserbableDatos = new Observable(subscriber => {
            let contador = 1;
            let tiempo: number = 0;
            let colaVueltas: Queue = new Queue();
            let colaFuerzas: Queue = new Queue();
            colaVueltas.copy(leerJson('vueltas.json'));
            colaFuerzas.copy(leerJson('fuerzas.json'));
            const ciclo = () => {
                if (estadoScript === 1) {
                    if (colaFuerzas.size() == 0) {
                        let jsonF = leerJson('fuerzas.json');
                        if (jsonF != -2 && typeof (jsonF) == 'object') {
                            colaFuerzas.copy(jsonF.filter((fuerza: { id: number; }) => fuerza.id >= contador));
                            colaFuerzasAnterior.clear();
                            colaFuerzasAnterior.enqueue(colaFuerzas.peek());
                        } else {
                            console.log('ERROR DEL LEERJSON F');
                            colaFuerzas = colaFuerzasAnterior;
                        }
                    };
                    if (colaVueltas.size() == 0) {
                        let jsonV = leerJson('vueltas.json');
                        if (jsonV != -2 && typeof (jsonV) == 'object') {
                            colaVueltas.copy(jsonV.filter((vuelta: { id: number; }) => vuelta.id >= contador));
                            colaVueltasAnterior.clear();
                            colaVueltasAnterior.enqueue(colaVueltas.peek());
                        } else {
                            console.log('ERROR DEL LEERJSON V', colaVueltasAnterior);
                            colaVueltas = colaVueltasAnterior;
                        }
                    };
                    let unaFuerza = colaFuerzas.peek();
                    let unaVuelta = colaVueltas.peek();
                    //condicion de parada
                    console.log('UNA vuelta', unaVuelta);
                    if (unaVuelta.dato == -1 && auxParada) {
                        //clearInterval(intervalo);
                        console.log('FIN EN PROCESAMIENTO PARAMETROS');
                        subscriber.complete();
                    }

                    if (unaVuelta.dato == -1 && !auxParada) {
                        console.log('+++++++++++++++++++++++++++   BUG INTERPRETACION PREMATURA  +++++++++++++++');
                        console.log('VALOR AUX PARADA', auxParada);
                        let jsonV = leerJson('vueltas.json');
                        colaVueltas.copy(jsonV.filter((vuelta: { id: number; }) => vuelta.id >= contador));
                        console.log('COLA EN ERROR: ', colaVueltas);
                        let unaVuelta = colaVueltas.peek();
                        if (unaVuelta.dato == -1) {
                            //si incluso despues de volver a copiar la cola, el dato de la vuelta sigue
                            //siendo -1, entonces que utilice la informacion de la siguiente posicion.
                            let unaVuelta = colaVueltas.peek(1);
                        }
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
                            //PUEDE OCURRIR QUE POR MAS QUE SE COPIE LA COLAFUERZAS AUN NO ALCANZE EL PUNTO DONDE
                            //ESTA LA COLA VUELTAS (POR LO CUAL HABRIA QUE COPIAR DE NUEVO HASTA QUE LLLEGUE A ESE PUNTO)
                            //Y ESTO NO ESTA CONTEMPLADO EN ESTE CODIGO
                            //IGUALMENTE NUNCA OCURRIO ESTO, PARA PENSAR...
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

                    } else if (typeof (unaFuerza) != 'object' || typeof (unaVuelta) != 'object') {
                        console.log('+++++++++++++++++++DATO DISTINTO DE OBJECT+++++++++++++++++++');
                        console.log('FUERZA: ', unaFuerza);
                        console.log('VUELTA: ', unaVuelta);
                        console.log('COLA FUERZA', colaFuerzas);
                        console.log('COLA VUELTAS', colaVueltas);
                    }
                }
            }

            const intervalo = setTimeout(ciclo, tiempoRespuesta.tiempoMS + 20);




        })
        let i = 1;
        const arregloParametros: any[] = [];
        obserbableDatos.subscribe(data => {
            arregloParametros.push(data);
            console.log('Data arregloParametros', data);
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


    } else if (typeof (m) == "string") {
        if (m === 'PARADA = TRUE') {
            console.log('RECIBIDO PARADA = TRUE');
            auxParada = true;
        }
    }


});