import { Router } from 'express';
import AmbienteController from '../controllers/ambiente.controllers';
const router = Router();
const controller = new AmbienteController();
//const controller = require('../controllers/ambiente.controllers');
router.get('/',controller.getAll);
router.get('/:idAmbiente',controller.getById);
router.post('/',controller.new);
router.delete('/:idAmbiente',controller.delete);
router.put('/:idAmbiente',controller.change);




export default router;