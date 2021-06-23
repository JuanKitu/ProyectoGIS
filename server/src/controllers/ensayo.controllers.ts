import { Request, Response } from 'express';
import Ensayo from '../models/Ensayo'
import Parametros from '../models/Parametros';
import Ambiente from '../models/Ambiente';
import { fork } from 'child_process';
import Server from '../classes/server';
import { AmbienteInterface, arregloDM, ParametroInterface } from '../interfaces/interfaces';
import moment from 'moment';
import { parse } from 'json2csv';
import { TableHints } from 'sequelize/types';
import fs from "fs";
import util from 'util';

const server = Server.instance;
server.conectar();
let FIN: boolean = false;
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
        const { carga, radioTrayectoria, diametroBola, distanciaTotal, tiempoTotal, materialBola, fecha, operador, observaciones, codigoProbeta, durezaProbeta, materialProbeta, tratamientoProbeta } = req.body;
        try {
            if (server.enUso() == -1) {
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
                    server.io.emit('respuestaUso', newEnsayo.idEnsayo);
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
            console.log('Iniciando consulta de creacion de parametros');
            if (server.consultarConectado() && server.consultarProcesando()===false) {
                console.log('SERVER: ', server.consultarConectado());
                server.setearProcesando(true);
                const elEnsayo = await Ensayo.findOne({
                    where: {
                        idEnsayo
                    },
                    raw: true
                });
                if (elEnsayo) {
                    let arreglosDM: arregloDM = {
                        arregloDistancias: [],
                        arregloMu: []
                    };
                    let velocidadAnterior: number = 0;
                    let distanciaAnterior: number = 0;
                    let tiempoAnterior: number = 0;
                    let distanciaActual: number = 0;
                    let velocidadActual: number = 0;
                    const horaDeInicio = (moment().format('HH:mm:ss'));
                    const hijoPFV = fork('../server/dist/serialport/Serialport.js', ['normal']);
                    hijoPFV.send(elEnsayo);
                    hijoPFV.on('message', (M: any) => {
                        if (FIN != true) {
                            if (typeof (M) == "object") {
                                if (isParametro(M) && M.vueltas !== undefined) {
                                    const punto = {
                                        distancia: (((M.vueltas) * (2 * Math.PI * elEnsayo.radioTrayectoria)).toFixed(2)).toString(),
                                        mu: M.coeficienteRozamiento
                                    };
                                    console.log('DISTANCIA RECORRIDA EN mm ', punto.distancia);
                                    console.log('DISTANCIA RECORRIDA EN m ', parseFloat(punto.distancia) / 1000);
                                    console.log('VUELTAS RECORRIDA ', M.vueltas);
                                    arreglosDM.arregloDistancias.push(punto.distancia);
                                    arreglosDM.arregloMu.push(punto.mu);
                                    server.setearArray(arreglosDM);
                                    distanciaActual = parseFloat(punto.distancia);
                                    if (M.tiempoActual != undefined) {
                                        /* console.log('DISTANCIA ANTERIOR 1: ',distanciaAnterior);
                                        console.log('TIEMPO ANTERIOR 1: ',tiempoAnterior);
                                        console.log('TIEMPO ACTUAL 1: ',M.tiempoActual); */
                                        velocidadActual = (distanciaActual - distanciaAnterior) / (M.tiempoActual - tiempoAnterior);
                                        //server.io.emit('velocidad',velocidadActual);
                                        if (velocidadActual > 100) {
                                            velocidadActual = velocidadAnterior;
                                        } else {
                                            velocidadAnterior = velocidadActual;
                                        }
                                        distanciaAnterior = distanciaActual;
                                        tiempoAnterior = M.tiempoActual;
                                    }
                                    server.io.emit('parametros', punto);
                                } else {
                                    /* console.log('DISTANCIA ANTERIOR 2: ',distanciaAnterior);
                                    console.log('TIEMPO ANTERIOR 2: ',tiempoAnterior);
                                    console.log('TIEMPO ACTUAL 2: ',M.tiempoActual); */
                                    console.log('AMBIENTE A MANDAR: ', M);
                                    M.horaInicio = horaDeInicio;
                                    M.horaFin = (moment().format('HH:mm:ss'));
                                    M.velocidad = velocidadActual;
                                    console.log('Ambiente: ', M);
                                    server.io.emit('ambiente', M);
                                }
                            }
                            if (typeof (M) == "string") {
                                if (M === 'PARAMETROS AGREGADOS') {
                                    setTimeout(() => {
                                        console.log('FIN PETICION');
                                        hijoPFV.kill();
                                        console.log('FIN PETICION 2');
                                        server.setearEnsayo(-1);
                                        server.io.emit('respuestaUso', -1);
                                        server.setearProcesando(false);
                                        res.json({
                                            data: 'Parametros agregados'
                                        });
                                        server.io.emit('fin', 'FIN')
                                    }, 1000);
                                }
                            }
                        } else {
                            hijoPFV.send('CANCELAR');
                            FIN = false;
                            server.setearEnsayo(-1);
                            server.io.emit('respuestaUso', -1);
                            server.setearProcesando(false);
                            setTimeout(() => {
                                hijoPFV.kill();
                                console.log('FIN PETICION');
                                res.json({
                                    data: 'Cancelado'
                                });
                            }, 1000)

                        }


                    })
                }
            } else {
                res.json({
                    data: 'En uso',
                    err: true
                });
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
            FIN = true;
            return res.json({
                data: 'CANCELADO'
            });
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    }

    conectar = async (req: Request, res: Response) => {
        try {
            const childConn = fork('../server/dist/serialport/conectar.js', ['normal']);
            childConn.on('message', (MP: number) => {
                server.setearConexion(true);
                console.log(server.consultarConectado());
                if (server.consultarConectado()) {
                    childConn.kill();
                    return res.json({
                        data: 'Connection established'
                    });
                }
            })
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    }

    desconectar = async (req: Request, res: Response) => {
        try {
            const childConn = fork('../server/dist/serialport/desconectar.js', ['normal']);
            childConn.on('message', (MP: number) => {
                server.setearConexion(false);
                console.log(server.consultarConectado());
                if (!server.consultarConectado()) {
                    return res.json({
                        data: 'Connection finished'
                    });
                }
            })
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    }

    consulta = async (req: Request, res: Response) => {
        try {

            console.log('CONECTADO: ', server.consultarConectado());
            console.log('PAUSA: ', server.consultarPausa());
            console.log('ENSAYO: ', server.enUso());
            return res.json({
                CONECTADO: server.consultarConectado(),
                PAUSA: server.consultarPausa(),
                ENSAYOOO: server.enUso()
            })
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    }

    consultaPuntos = async (req: Request, res: Response) => {
        const { idEnsayo } = req.params;
        try {
            const elEnsayo = await Ensayo.findOne({
                where: {
                    idEnsayo
                },
                raw: true
            });
            if (elEnsayo) {
                const parametro = await Parametros.findAll({
                    where: {
                        idEnsayo
                    }
                });

                let arreglosDM: arregloDM = {
                    arregloDistancias: [],
                    arregloMu: []
                };
                const asignar = (unParametro: any) => {
                    arreglosDM.arregloDistancias.push((((unParametro.vueltas) * (2 * Math.PI * elEnsayo.radioTrayectoria)).toFixed(2)).toString()),
                        arreglosDM.arregloMu.push(unParametro.coeficienteRozamiento)
                }
                parametro.forEach(elemento => asignar(elemento));
                return res.json({
                    data: arreglosDM
                });
            }
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    }

    saveAsTxt = async (req: Request, res: Response) => {
        const { idEnsayo } = req.params;
        const fields = ['distancia', 'mu'];
        const opts = { fields };
        try {
            const elEnsayo = await Ensayo.findOne({
                where: {
                    idEnsayo
                },
                raw: true
            });
            if (elEnsayo) {
                const parametro = await Parametros.findAll({
                    where: {
                        idEnsayo
                    }
                });
                const ambiente = await Ambiente.findAll({
                    where: {
                        idEnsayo
                    }
                });
                let elements: any = []
                let obj = {
                    distancia: '',
                    mu: 0
                };
                const TAB = '\t';
                const LJ = "\n";
                let timer = 150; //Numero de iteraciones para que se cambie al siguiente ambiente 
                //ya que como los ambientes se toman cada 60s y los parametros cada 0.4s
                //entonces a cada ambiente le corresponden 150 parametros
                let numeroDeAmbiente = 1;
                let txtCompleto = '';
                let renglonDatosConPuntos = '';
                let renglonDatosConComa = '';
                const renglonesEstandar = 'Fecha' + TAB + elEnsayo.fecha + TAB + ambiente[1].horaActual + LJ +
                    'Operador' + TAB + elEnsayo.operador + LJ +
                    'Probeta' + TAB + elEnsayo.codigoProbeta + LJ +
                    'Material' + TAB + elEnsayo.materialProbeta + LJ +
                    'Dureza' + TAB + elEnsayo.durezaProbeta + LJ +
                    'Tratamiento' + TAB + elEnsayo.tratamientoProbeta + LJ +
                    'Radio' + TAB + elEnsayo.radioTrayectoria + LJ +
                    'Distancia' + TAB + elEnsayo.distanciaTotal + LJ +
                    'Carga' + TAB + elEnsayo.carga + LJ +
                    'Bolilla' + TAB + elEnsayo.materialBola + LJ +
                    'Diametro' + TAB + elEnsayo.diametroBola + LJ +
                    'fuerza[kg]' + TAB + 'distancia[m]' + TAB + 'tiempo[s]' + TAB + 'temperatura[°C]' + TAB + 'humedad[%]' + LJ;
                txtCompleto = renglonesEstandar;
                const asignar = (unParametro: ParametroInterface) => {
                    if (unParametro.fuerzaRozamiento && unParametro.vueltas && unParametro.tiempoActual) {
                        let fuerza = unParametro.fuerzaRozamiento;
                        let distancia = ((((unParametro.vueltas) * (2 * Math.PI * elEnsayo.radioTrayectoria)).toFixed(2)));
                        let tiempo = unParametro.tiempoActual;
                        let temperatura = ambiente[numeroDeAmbiente].temperatura;
                        let humedad = ambiente[numeroDeAmbiente].humedad;
                        renglonDatosConPuntos = fuerza.toString() + TAB + distancia.toString() + TAB + tiempo.toString() + TAB + temperatura.toString() + TAB + humedad.toString() + LJ;
                        renglonDatosConComa = renglonDatosConPuntos.replace(/\./g, ',');
                        txtCompleto = txtCompleto + renglonDatosConComa;
                        timer = timer - 1;
                        if (timer === 0) {
                            timer = 150;
                            numeroDeAmbiente = numeroDeAmbiente + 1;
                        }
                    }
                }
                parametro.forEach(elemento => asignar(elemento));
                const titulo = 'Ensayo - ' + elEnsayo.fecha + '.txt';
                console.log(titulo + LJ);
                console.log(txtCompleto);
                fs.writeFile(titulo, txtCompleto, 'utf8', function (err: any) {
                    if (err) {
                        console.log("An error occured while writing JSON Object to File.");
                        return console.log(err);
                    }
                    let txt: any = '';
                    fs.readFile(titulo, 'utf8', function (err, data) {
                        if (err) {
                            console.log(err);
                            process.exit(1);
                        }
                        txt = util.format(data);
                    });
                    console.log(txt);
                    res.header('Content-Type', 'text/txt');
                    res.attachment(titulo);
                    return res.send(txt);
                });

            }
        } catch (error) {
            console.log(error);
            return res.json({
                error: 'The server has an error'
            });
        }
    }
}
