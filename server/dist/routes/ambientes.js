"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ambiente_controllers_1 = __importDefault(require("../controllers/ambiente.controllers"));
const router = express_1.Router();
const controller = new ambiente_controllers_1.default();
//const controller = require('../controllers/ambiente.controllers');
router.get('/', controller.getAll);
router.get('/:idAmbiente', controller.getById);
router.post('/', controller.new);
router.delete('/:idAmbiente', controller.delete);
router.put('/:idAmbiente', controller.change);
exports.default = router;
