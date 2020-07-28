import { Router } from 'express';
import ParametrosController from '../controllers/parametros.controllers';

const router = Router();
const controller = new ParametrosController();
router.get('/',controller.getAll);
router.get('/:idParametro',controller.getById);
router.post('/',controller.new);
router.delete('/:idParametro',controller.delete);
router.put('/:idParametro',controller.change);




export default router;