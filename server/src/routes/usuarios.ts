import { Router } from 'express';
import UsuarioController from '../controllers/usuario.controllers';
const router = Router();

const controller = new UsuarioController();
router.get('/',controller.getAll);
router.get('/:idUsuario',controller.getById);
router.post('/',controller.new);
router.delete('/:idUsuario',controller.delete);
router.put('/:idUsuario',controller.change);




export default router;