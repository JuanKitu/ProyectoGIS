import { Router } from 'express';
import EnsayoController from '../controllers/ensayo.controllers';
const router = Router();
const controller = new EnsayoController();

router.get('/', controller.getAll);
router.get('/:idEnsayo', controller.getById);
router.post('/', controller.new);
router.delete('/:idEnsayo', controller.delete);
router.put('/:idEnsayo', controller.change);
//router.post('/:idEnsayo', controller.newParametro);
router.put('/:idEnsayo/parametros/:idParametro', controller.EditAParametro);
router.delete('/:idEnsayo/parametros/:idParametro', controller.deleteAParametro);
router.get('/:idEnsayo/parametros', controller.getAllParametros);
router.get('/:idEnsayo/parametros/:idParametro', controller.getAParametro);
router.get('/:idEnsayo/ambiente', controller.getAllAmbiente);
router.get('/:idEnsayo/ambiente/:idAmbiente', controller.getAnAmbiente);

export default router;