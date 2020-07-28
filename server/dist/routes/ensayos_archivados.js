"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ensayo_archivados_controllers_1 = __importDefault(require("../controllers/ensayo_archivados.controllers"));
const router = express_1.Router();
const controller = new ensayo_archivados_controllers_1.default();
router.get('/', controller.getAll);
router.get('/:idEnsayo', controller.getById);
router.post('/:idEnsayo', controller.restoreEnsayo);
router.delete('/:idEnsayo', controller.delete);
router.get('/:idEnsayo/parametros_archivados', controller.getAllParametros);
router.get('/:idEnsayo/parametros_archivados/:idParametro', controller.getAParametro);
router.get('/:idEnsayo/ambiente', controller.getAllAmbiente);
router.get('/:idEnsayo/ambiente/:idAmbiente', controller.getAnAmbiente);
exports.default = router;
