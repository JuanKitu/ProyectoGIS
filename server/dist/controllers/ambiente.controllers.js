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
const Ambiente_1 = __importDefault(require("../models/Ambiente"));
const moment = require('moment');
class AmbienteController {
    constructor() {
        this.new = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idEnsayo, temperatura, humedad } = req.body;
            try {
                const horaActual = (moment().format('HH:mm:ss'));
                const newAmbiente = yield Ambiente_1.default.create({
                    idEnsayo,
                    temperatura,
                    humedad,
                    horaActual
                });
                if (newAmbiente) {
                    return res.json({
                        message: 'The Ambiente has been created',
                        data: newAmbiente
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
        //Query a Ambiente
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const Ambientes = yield Ambiente_1.default.findAll();
                return res.json({
                    data: Ambientes
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Edit an Ambiente
        this.change = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idAmbiente } = req.params;
            const { idEnsayo, temperatura, humedad, horaActual } = req.body;
            try {
                yield Ambiente_1.default.update({
                    idEnsayo,
                    temperatura,
                    humedad,
                    horaActual
                }, {
                    where: {
                        idAmbiente
                    },
                });
                const ambiente = yield Ambiente_1.default.findOne({
                    where: {
                        idAmbiente
                    }
                });
                return res.json({
                    message: 'The Ambiente has been changed',
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
        //Delete an Ambiente
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { idAmbiente } = req.params;
                const deleteRowCount = yield Ambiente_1.default.destroy({
                    where: {
                        idAmbiente
                    }
                });
                return res.json({
                    message: 'The Ambiente has been deleted',
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
        //Find an Ambiente
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idAmbiente } = req.params;
            try {
                const ambiente = yield Ambiente_1.default.findOne({
                    where: {
                        idAmbiente
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
    }
}
exports.default = AmbienteController;
