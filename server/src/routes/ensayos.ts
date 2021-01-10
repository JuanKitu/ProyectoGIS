import { Router } from 'express';
import EnsayoController from '../controllers/ensayo.controllers';
const router = Router();
const controller = new EnsayoController();
import net from 'net'
import Server from '../classes/server';
import { Observable, Subscriber } from 'rxjs';
import { fork } from 'child_process';

router.get('/:idEnsayo/puntos', controller.consultaPuntos);
router.get('/consulta', controller.consulta);
router.get('/desconectar', controller.desconectar);
router.get('/conectar', controller.conectar);
router.get('/test', controller.realizarTest);
router.get('/pausar', controller.pausar);
router.get('/reanudar', controller.reanudar);
router.get('/cancelar', controller.cancelar);
router.get('/', controller.getAll);
router.get('/:idEnsayo', controller.getById);
router.post('/', controller.new);
router.delete('/:idEnsayo', controller.delete);
router.put('/:idEnsayo', controller.change);
router.post('/:idEnsayo', controller.crearParametros);
router.put('/:idEnsayo/parametros/:idParametro', controller.EditAParametro);
router.delete('/:idEnsayo/parametros/:idParametro', controller.deleteAParametro);
router.get('/:idEnsayo/parametros', controller.getAllParametros);
router.get('/:idEnsayo/parametros/:idParametro', controller.getAParametro);
router.get('/:idEnsayo/ambiente', controller.getAllAmbiente);
router.get('/:idEnsayo/ambiente/:idAmbiente', controller.getAnAmbiente);

export default router;