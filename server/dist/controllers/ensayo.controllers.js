"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pausar = void 0;
const Ensayo_1 = __importDefault(require("../models/Ensayo"));
const Parametros_1 = __importDefault(require("../models/Parametros"));
const Ambiente_1 = __importDefault(require("../models/Ambiente"));
const child_process_1 = require("child_process");
const server_1 = __importDefault(require("../classes/server"));
const moment_1 = __importDefault(require("moment"));
const server = server_1.default.instance;
//const Parametros = require('../models/Parametros');
//const Ambiente = require('../models/Ambiente');
function isParametro(object) {
    return 'fuerzaRozamiento' in object;
}
class EnsayoController {
    constructor() {
        //Create an Ensayo
        this.new = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { carga, radioTrayectoria, diametroBola, distanciaTotal, tiempoTotal, materialBola, operador, observaciones, codigoProbeta, durezaProbeta, materialProbeta, tratamientoProbeta } = req.body;
            try {
                if (server.enUso() == -1) {
                    const dateNow = new Date();
                    const fecha = dateNow.toLocaleDateString();
                    const newEnsayo = yield Ensayo_1.default.create({
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
                    }
                    ;
                }
                else {
                    return res.json({
                        message: 'Experimento en progreso',
                        data: -1
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Query an Ensayo
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const ensayos = yield Ensayo_1.default.findAll();
                return res.json({
                    data: ensayos
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Edit an ensayo
        this.change = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idEnsayo } = req.params;
            const { carga, radioTrayectoria, diametroBola, distanciaTotal, tiempoTotal, materialBola, fecha, operador, observaciones, codigoProbeta, durezaProbeta, materialProbeta, tratamientoProbeta } = req.body;
            try {
                yield Ensayo_1.default.update({
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
                const ensayo = yield Ensayo_1.default.findOne({
                    where: {
                        idEnsayo
                    }
                });
                return res.json({
                    message: 'The ensayo has been changed',
                    data: ensayo
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Delete an ensayo
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { idEnsayo } = req.params;
                const deleteRowCount = yield Ensayo_1.default.destroy({
                    where: {
                        idEnsayo
                    }
                });
                return res.json({
                    message: 'The ensayo has been deleted',
                    count: deleteRowCount
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Find an Ensayo
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idEnsayo } = req.params;
            try {
                const ensayo = yield Ensayo_1.default.findOne({
                    where: {
                        idEnsayo
                    }
                });
                return res.json({
                    data: ensayo
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Find all Ensayo's parametros
        this.getAllParametros = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idEnsayo } = req.params;
            try {
                const parametro = yield Parametros_1.default.findAll({
                    where: {
                        idEnsayo
                    }
                });
                return res.json({
                    data: parametro
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Create an Ensayo's Parametro
        this.crearParametros = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idEnsayo } = req.params;
            try {
                const elEnsayo = yield Ensayo_1.default.findOne({
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
                    let arreglosDM = {
                        arregloDistancias: [],
                        arregloMu: []
                    };
                    let velocidadActual = 0;
                    const horaDeInicio = (moment_1.default().format('HH:mm:ss'));
                    const hijoPFV = child_process_1.fork('../server/dist/serialport/Serialport.js', ['normal']);
                    hijoPFV.send(elEnsayo);
                    hijoPFV.on('message', (M) => {
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
                                        if (M.tiempoActual != undefined)
                                            velocidadActual = parseFloat(punto.distancia) / M.tiempoActual;
                                        server.io.emit('parametros', punto);
                                    }
                                    else {
                                        M.horaInicio = horaDeInicio;
                                        M.horaFin = (moment_1.default().format('HH:mm:ss'));
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
                            }
                            else {
                                console.log('¡¡¡RECIBIENDO PAUSA DEL CLIENTE!!!');
                                hijoPFV.send('PAUSA');
                                const cicloPausa = setInterval(() => {
                                    if (server.consultarPausa() === false) {
                                        console.log('¡¡¡RECIBIENDO REANUDAR DEL CLIENTE!!!');
                                        hijoPFV.send('REANUDAR');
                                        clearInterval(cicloPausa);
                                    }
                                }, 500);
                            }
                        }
                        else {
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
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Find a Ensayo's Parametro
        this.getAParametro = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idParametro, idEnsayo } = req.params;
            try {
                const parametro = yield Parametros_1.default.findOne({
                    where: {
                        idParametro,
                        idEnsayo
                    }
                });
                return res.json({
                    data: parametro
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Edit a Ensayo's Parametro
        this.EditAParametro = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idParametro, idEnsayo } = req.params;
            const { vueltas, coeficienteRozamiento, tiempoActual, fuerzaRozamiento } = req.body;
            try {
                const parametro = yield Parametros_1.default.findOne({
                    where: {
                        idParametro,
                        idEnsayo
                    }
                });
                if (parametro) {
                    yield parametro.update({
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
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Delete a Ensayo's parametro
        this.deleteAParametro = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { idParametro, idEnsayo } = req.params;
                const deleteRowCount = yield Parametros_1.default.destroy({
                    where: {
                        idParametro,
                        idEnsayo
                    }
                });
                return res.json({
                    message: 'The parametro has been deleted',
                    count: deleteRowCount
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Find all Ensayo's ambiente
        this.getAllAmbiente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idEnsayo } = req.params;
            try {
                const ambiente = yield Ambiente_1.default.findAll({
                    where: {
                        idEnsayo
                    }
                });
                return res.json({
                    data: ambiente
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Find a Ensayo's ambiente
        this.getAnAmbiente = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idAmbiente, idEnsayo } = req.params;
            try {
                const ambiente = yield Ambiente_1.default.findOne({
                    where: {
                        idAmbiente,
                        idEnsayo
                    }
                });
                return res.json({
                    data: ambiente
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Test the machine
        this.realizarTest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const hijoTest = child_process_1.fork('../server/dist/serialport/SerialportTest.js', ['normal']);
                hijoTest.on('message', (M) => {
                    hijoTest.kill();
                    console.log('Matando test');
                    return res.json({
                        data: 'TEST'
                    });
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        this.pausar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                server.pausar(true);
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        this.reanudar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                server.pausar(false);
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        this.cancelar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                server.setearEnsayo(-1);
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
    }
}
exports.default = EnsayoController;
