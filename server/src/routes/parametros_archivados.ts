import { Router } from 'express';
import ParametrosArchivadosIController from '../controllers/parametros_archivados.controllers';

const router = Router();
const controller = new ParametrosArchivadosIController();
router.get('/',controller.getAll);
router.get('/:idParametro',controller.getById);
router.delete('/:idParametro',controller.delete);




export default router;