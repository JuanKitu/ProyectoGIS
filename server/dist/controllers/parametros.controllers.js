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
const Parametros_1 = __importDefault(require("../models/Parametros"));
class ParametrosController {
    constructor() {
        //Create an Parametros
        this.new = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idEnsayo, fuerzaRozamiento, coeficienteRozamiento, vueltas, tiempoActual } = req.body;
            try {
                const newParametros = yield Parametros_1.default.create({
                    idEnsayo,
                    fuerzaRozamiento,
                    coeficienteRozamiento,
                    vueltas,
                    tiempoActual,
                });
                if (newParametros) {
                    return res.json({
                        message: 'The Parametros has been created',
                        data: newParametros
                    });
                }
                ;
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Query an Parametros
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const parametros = yield Parametros_1.default.findAll();
                return res.json({
                    data: parametros
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Edit an parametro
        this.change = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idParametro } = req.params;
            const { idEnsayo, fuerzaRozamiento, coeficienteRozamiento, vueltas, tiempoActual } = req.body;
            try {
                yield Parametros_1.default.update({
                    idEnsayo,
                    fuerzaRozamiento,
                    coeficienteRozamiento,
                    vueltas,
                    tiempoActual,
                }, {
                    where: {
                        idParametro
                    },
                });
                const parametro = yield Parametros_1.default.findOne({
                    where: {
                        idParametro
                    }
                });
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
        //Delete an parametro
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { idParametro } = req.params;
                const deleteRowCount = yield Parametros_1.default.destroy({
                    where: {
                        idParametro
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
        //Find an Parametros
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idParametro } = req.params;
            try {
                const parametro = yield Parametros_1.default.findOne({
                    where: {
                        idParametro
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
    }
}
exports.default = ParametrosController;
