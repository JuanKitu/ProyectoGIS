import { Router } from 'express';
import UsuarioController from '../controllers/usuario.controllers';
import { verificaToken } from '../middleware/autenticacion'
const router = Router();

const controller = new UsuarioController();

router.post('/google',controller.google);
router.get('/',controller.getAll);
router.post('/login', controller.login);
router.get('/:idUsuario',verificaToken,controller.getById);
router.post('/',controller.new);
router.delete('/:idUsuario',verificaToken,controller.delete);
router.put('/:idUsuario',verificaToken,controller.change);




export default router;