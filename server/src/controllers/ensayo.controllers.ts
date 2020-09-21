import { Request, Response } from 'express';
import Ensayo from '../models/Ensayo'
import Parametros from '../models/Parametros';
import Ambiente from '../models/Ambiente';
import { async } from 'rxjs';
import EnsayoArchivadosController from './ensayo_archivados.controllers';
import { fork } from 'child_process';
import SerialPort from 'serialport';
import * as socket from '../socket/socket';
import Server from '../classes/server';
import { any } from 'bluebird';
import { arregloDM, EnsayoInterface, ParametroInterface } from '../interfaces/interfaces';
import moment from 'moment';
import { Socket } from 'socket.io';
const server = Server.instance;
//const Parametros = require('../models/Parametros');
//const Ambiente = require('../models/Ambiente');
function isParametro(object: any): object is ParametroInterface {
    return 'fuerzaRozamiento' in object;
}

export let pausar: any;
export default class EnsayoController {

    constructor() { }
    //Create an Ensayo
    new = async (req: Request, res: Response) => {
        const { carga, radioTrayectoria, diametroBola, distanciaTotal, tiempoTotal, materialBola, operador, observaciones, codigoProbeta, durezaProbeta, materialProbeta, tratamientoProbeta } = req.body;
        try {
            if (server.enUso() == -1) {
                const dateNow = new Date();
                const fecha = dateNow.toLocaleDateString();
                const newEnsayo = await Ensayo.create({
                    carga,
                    radioTrayectoria,
                    diametroBola,
                    distanciaTotal,
                    tiempoTotal,
                    materialBola,
                    fecha,
                    operador,
                    observaciones,
                    codigoProbeta,
                    durezaProbeta,
                    materialProbeta,
                    tratamientoProbeta
                });
                if (newEnsayo) {
                    server.setearEnsayo(newEnsayo.idEnsayo);
                    return res.json({
                        message: 'The Ensayo has been created',
                        data: newEnsayo
                    });
                };
            } else {
                return res.json({
                    message: 'Experimento en progreso',
                    data: -1
                });
            }

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Query an Ensayo
    getAll = async (req: Request, res: Response) => {
        try {
            const ensayos = await Ensayo.findAll();
            return res.json({
                data: ensayos
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Edit an ensayo
    change = async (req: Request, res: Response) => {
        const { idEnsayo } = req.params;
        const { carga, radioTrayectoria, diametroBola, distanciaTotal, tiempoTotal, materialBola, fecha, operador, observaciones, codigoProbeta, durezaProbeta, materialProbeta, tratamientoProbeta } = req.body;
        try {
            await Ensayo.update({
                carga,
                radioTrayectoria,
                diametroBola,
                distanciaTotal,
                tiempoTotal,
                materialBola,
                fecha,
                operador,
                observaciones,
                codigoProbeta,
                durezaProbeta,
                materialProbeta,
                tratamientoProbeta
            }, {
                where: {
                    idEnsayo
                },
            });
            const ensayo = await Ensayo.findOne({
                where: {
                    idEnsayo
                }
            });
            return res.json({
                message: 'The ensayo has been changed',
                data: ensayo
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Delete an ensayo
    delete = async (req: Request, res: Response) => {
        try {
            const { idEnsayo } = req.params;
            const deleteRowCount = await Ensayo.destroy({
                where: {
                    idEnsayo
                }
            });
            return res.json({
                message: 'The ensayo has been deleted',
                count: deleteRowCount
            });

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };
    //Find an Ensayo
    getById = async (req: Request, res: Response) => {
        const { idEnsayo } = req.params;
        try {
            const ensayo = await Ensayo.findOne({
                where: {
                    idEnsayo
                }
            });
            return res.json({
                data: ensayo
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Find all Ensayo's parametros
    getAllParametros = async (req: Request, res: Response) => {
        const { idEnsayo } = req.params;
        try {
            const parametro = await Parametros.findAll({
                where: {
                    idEnsayo
                }
            });
            return res.json({
                data: parametro
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Create an Ensayo's Parametro
    crearParametros = async (req: Request, res: Response) => {
        const { idEnsayo } = req.params;
        try {
            const elEnsayo = await Ensayo.findOne({
                where: {
                    idEnsayo
                },
                raw: true
            });
            if (elEnsayo) {
                /* server.io.on('PAUSAR', () => {
                    console.log('¡¡¡RECIBIENDO PAUSA DEL CLIENTE!!!');
                    hijoPFV.send('PAUSA');
                })
                server.io.on('CANCELAR', () => {
                    console.log('¡¡¡RECIBIENDO CANCELAR DEL CLIENTE!!!');
                    hijoPFV.send('CANCELAR');
                })
                server.io.on('REANUDAR', () => {
                    console.log('¡¡¡RECIBIENDO REANUDAR DEL CLIENTE!!!');
                    hijoPFV.send('REANUDAR');
                }) */
                let arreglosDM: arregloDM = {
                    arregloDistancias: [],
                    arregloMu: []
                };
                let velocidadActual: number = 0;
                const horaDeInicio = (moment().format('HH:mm:ss'));
                const hijoPFV = fork('../server/dist/serialport/Serialport.js', ['normal']);
                hijoPFV.send(elEnsayo);
                hijoPFV.on('message', (M: any) => {
                    if (server.enUso() !== -1) {
                        if (server.consultarPausa() === false) {
                            if (typeof (M) == "object") {
                                if (isParametro(M) && M.vueltas !== undefined) {
                                    const punto = {
                                        distancia: (((M.vueltas) * (2 * Math.PI * elEnsayo.radioTrayectoria)).toFixed(2)).toString(),
                                        mu: M.coeficienteRozamiento
                                    };
                                    console.log('DISTANCIA RECORRIDA ', punto.distancia);
                                    arreglosDM.arregloDistancias.push(punto.distancia);
                                    arreglosDM.arregloMu.push(punto.mu);
                                    server.setearArray(arreglosDM);
                                    if (M.tiempoActual != undefined) velocidadActual = parseFloat(punto.distancia) / M.tiempoActual;
                                    server.io.emit('parametros', punto);
                                } else {
                                    M.horaInicio = horaDeInicio;
                                    M.horaFin = (moment().format('HH:mm:ss'));
                                    M.velocidad = velocidadActual;
                                    console.log('Ambiente: ', M);
                                    server.io.emit('ambiente', M);
                                }
                            }
                            if (typeof (M) == "string") {
                                if (M === 'AMBIENTES') {
                                    console.log('FIN PETICION');
                                    hijoPFV.kill();
                                    console.log('FIN PETICION 2');
                                    server.setearEnsayo(-1);
                                    server.io.emit('fin', 'FIN');
                                    return res.json({
                                        data: elEnsayo
                                    });
                                }


                            }
                        } else {
                            console.log('¡¡¡RECIBIENDO PAUSA DEL CLIENTE!!!');
                            hijoPFV.send('PAUSA');
                            const cicloPausa = setInterval(() => {
                                if (server.consultarPausa() === false) {
                                    console.log('¡¡¡RECIBIENDO REANUDAR DEL CLIENTE!!!');
                                    hijoPFV.send('REANUDAR');
                                    clearInterval(cicloPausa);
                                }
                            }, 500)
                        }
                        
                    }else{
                        console.log('FIN PETICION');
                        hijoPFV.kill();
                        console.log('FIN PETICION 2');
                        server.io.emit('fin', 'FIN');
                        return res.json({
                            data: 'Ensayo cancelado'
                        });

                    }


                    /* pausar = (cliente: Socket,io:SocketIO.Server)=>{
                        cliente.on('PAUSAR',()=>{
                            console.log('¡¡¡RECIBIENDO PAUSA DEL CLIENTE!!!');
                            hijoPFV.send('PAUSA');
                        })
                    } */


                })
            }

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Find a Ensayo's Parametro
    getAParametro = async (req: Request, res: Response) => {
        const { idParametro, idEnsayo } = req.params;
        try {
            const parametro = await Parametros.findOne({
                where: {
                    idParametro,
                    idEnsayo
                }
            });


            return res.json({
                data: parametro
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Edit a Ensayo's Parametro
    EditAParametro = async (req: Request, res: Response) => {
        const { idParametro, idEnsayo } = req.params;
        const { vueltas, coeficienteRozamiento, tiempoActual, fuerzaRozamiento } = req.body;
        try {
            const parametro = await Parametros.findOne({
                where: {
                    idParametro,
                    idEnsayo
                }
            });
            if (parametro) {
                await parametro.update({
                    fuerzaRozamiento,
                    coeficienteRozamiento,
                    vueltas,
                    tiempoActual,
                }, {
                    where: {
                        idParametro,
                        idEnsayo
                    },
                });
            }
            return res.json({
                message: 'The parametro has been changed',
                data: parametro
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Delete a Ensayo's parametro
    deleteAParametro = async (req: Request, res: Response) => {
        try {
            const { idParametro, idEnsayo } = req.params;
            const deleteRowCount = await Parametros.destroy({
                where: {
                    idParametro,
                    idEnsayo
                }
            });
            return res.json({
                message: 'The parametro has been deleted',
                count: deleteRowCount
            });

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Find all Ensayo's ambiente
    getAllAmbiente = async (req: Request, res: Response) => {
        const { idEnsayo } = req.params;
        try {
            const ambiente = await Ambiente.findAll({
                where: {
                    idEnsayo
                }
            });
            return res.json({
                data: ambiente
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Find a Ensayo's ambiente
    getAnAmbiente = async (req: Request, res: Response) => {
        const { idAmbiente, idEnsayo } = req.params;
        try {
            const ambiente = await Ambiente.findOne({
                where: {
                    idAmbiente,
                    idEnsayo
                }
            });


            return res.json({
                data: ambiente
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    };

    //Test the machine
    realizarTest = async (req: Request, res: Response) => {
        try {
            const hijoTest = fork('../server/dist/serialport/SerialportTest.js', ['normal']);
            hijoTest.on('message', (M: any) => {
                hijoTest.kill();
                console.log('Matando test');
                return res.json({
                    data: 'TEST'
                });
            })

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    }

    pausar = async (req: Request, res: Response) => {
        try {
            server.pausar(true);

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    }

    reanudar = async (req: Request, res: Response) => {
        try {
            server.pausar(false);

        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    }

    cancelar = async (req: Request, res: Response) => {
        try {
            server.setearEnsayo(-1);
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    }
}
