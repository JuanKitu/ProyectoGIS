"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controllers_1 = __importDefault(require("../controllers/usuario.controllers"));
const router = express_1.Router();
const controller = new usuario_controllers_1.default();
router.get('/', controller.getAll);
router.get('/:idUsuario', controller.getById);
router.post('/', controller.new);
router.delete('/:idUsuario', controller.delete);
router.put('/:idUsuario', controller.change);
exports.default = router;
