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
const Parametros_archivados_1 = __importDefault(require("../models/Parametros_archivados"));
class ParametrosArchivadosIController {
    constructor() {
        //Query an Parametros
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const parametros_archivados = yield Parametros_archivados_1.default.findAll();
                console.log(parametros_archivados);
                return res.json({
                    data: parametros_archivados
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
                const deleteRowCount = yield Parametros_archivados_1.default.destroy({
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
                const parametros_archivados = yield Parametros_archivados_1.default.findOne({
                    where: {
                        idParametro
                    }
                });
                return res.json({
                    data: parametros_archivados
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
exports.default = ParametrosArchivadosIController;
