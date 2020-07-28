"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parametros_archivados_controllers_1 = __importDefault(require("../controllers/parametros_archivados.controllers"));
const router = express_1.Router();
const controller = new parametros_archivados_controllers_1.default();
router.get('/', controller.getAll);
router.get('/:idParametro', controller.getById);
router.delete('/:idParametro', controller.delete);
exports.default = router;
