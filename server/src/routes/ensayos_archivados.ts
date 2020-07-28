import { Router } from 'express';
import EnsayoArchivadosController from '../controllers/ensayo_archivados.controllers';

const router = Router();
const controller = new EnsayoArchivadosController();
router.get('/', controller.getAll);
router.get('/:idEnsayo', controller.getById);
router.post('/:idEnsayo', controller.restoreEnsayo);
router.delete('/:idEnsayo', controller.delete);
router.get('/:idEnsayo/parametros_archivados', controller.getAllParametros);
router.get('/:idEnsayo/parametros_archivados/:idParametro', controller.getAParametro);
router.get('/:idEnsayo/ambiente', controller.getAllAmbiente);
router.get('/:idEnsayo/ambiente/:idAmbiente', controller.getAnAmbiente);

export default router;