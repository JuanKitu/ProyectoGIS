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
const Ensayo_Archivados_1 = __importDefault(require("../models/Ensayo_Archivados"));
const Ensayo_1 = __importDefault(require("../models/Ensayo"));
const Ambiente_1 = __importDefault(require("../models/Ambiente"));
const Parametros_archivados_1 = __importDefault(require("../models/Parametros_archivados"));
const Parametros_1 = __importDefault(require("../models/Parametros"));
const controller = {};
class EnsayoArchivadosController {
    constructor() {
        //Restore an Ensayo
        this.restoreEnsayo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idEnsayo } = req.params;
            //Finding the Ensayo we want to restore and use the raw data
            try {
                const restoredEnsayo = yield Ensayo_Archivados_1.default.findOne({
                    where: {
                        idEnsayo
                    },
                    raw: true
                });
                //Finding all the Parametros belonging to the Ensayo and use the raw data
                const newParametros = yield Parametros_archivados_1.default.findAll({
                    where: {
                        idEnsayo
                    },
                    raw: true
                });
                if (restoredEnsayo) {
                    if (newParametros) {
                        //Creating the Ensayo
                        const auxEnsayo = restoredEnsayo;
                        yield Ensayo_1.default.create(auxEnsayo);
                        //Creating all Parametros in cascade because the JSON newParametros contains several parametros using bulkCreate
                        const pruebaParametros = newParametros;
                        yield Parametros_1.default.bulkCreate(pruebaParametros);
                        return res.json({
                            message: 'The Parametros has been created',
                            data: newParametros
                        }),
                            yield Ensayo_Archivados_1.default.destroy({
                                where: {
                                    idEnsayo
                                }
                            });
                    }
                }
                ;
                return {};
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
                const archivados = yield Ensayo_Archivados_1.default.findAll();
                return res.json({
                    data: archivados
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
                const archivado = yield Ensayo_Archivados_1.default.findOne({
                    where: {
                        idEnsayo
                    }
                });
                return res.json({
                    data: archivado
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
                const parametro = yield Parametros_archivados_1.default.findAll({
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
        //Find a Ensayo's Parametro
        this.getAParametro = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idParametro, idEnsayo } = req.params;
            try {
                const parametro = yield Parametros_archivados_1.default.findOne({
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
        //Delete an ensayo
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { idEnsayo } = req.params;
                const deleteRowCount = yield Ensayo_Archivados_1.default.destroy({
                    where: {
                        idEnsayo
                    }
                });
                return res.json({
                    message: 'The Archivado has been deleted',
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
    }
}
exports.default = EnsayoArchivadosController;
