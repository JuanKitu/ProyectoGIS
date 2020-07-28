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
const Usuario_1 = __importDefault(require("../models/Usuario"));
class UsuarioController {
    constructor() {
        //Create an Usuario
        this.new = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { hash, salt, legajo } = req.body;
            try {
                const newUsuario = yield Usuario_1.default.create({
                    hash,
                    salt,
                    legajo
                });
                if (newUsuario) {
                    return res.json({
                        message: 'The Usuario has been created',
                        data: newUsuario
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
        //Query an Usuario
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const Usuarios = yield Usuario_1.default.findAll();
                return res.json({
                    data: Usuarios
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Edit an Usuario
        this.change = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            const { hash, salt, legajo } = req.body;
            try {
                yield Usuario_1.default.update({
                    hash,
                    salt,
                    legajo
                }, {
                    where: {
                        idUsuario
                    },
                });
                const usuario = yield Usuario_1.default.findOne({
                    where: {
                        idUsuario
                    }
                });
                return res.json({
                    message: 'The Usuario has been changed',
                    data: usuario
                });
            }
            catch (error) {
                console.log(error);
                return res.json({
                    error: 'The server has an error'
                });
            }
        });
        //Delete an Usuario
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { idUsuario } = req.params;
                const deleteRowCount = yield Usuario_1.default.destroy({
                    where: {
                        idUsuario
                    }
                });
                return res.json({
                    message: 'The Usuario has been deleted',
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
        //Find an Usuario
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            try {
                const usuario = yield Usuario_1.default.findOne({
                    where: {
                        idUsuario
                    }
                });
                return res.json({
                    data: usuario
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
exports.default = UsuarioController;
