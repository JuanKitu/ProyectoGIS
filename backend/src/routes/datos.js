const {Router} = require('express');
const router = Router();
const controller = require('../controllers/datos.controllers');
router.get('/',controller.getAll);
router.get('/:idDato',controller.getById);
router.post('/',controller.new);
router.delete('/:idDato',controller.delete);
router.put('/:idDato',controller.change);
router.get('/:idDato/parametros',controller.getAllParametros);
router.get('/:idDato/parametros/:idParametro',controller.getAParametro);
router.get('/:idDato/ambiente',controller.getAllAmbiente);
router.get('/:idDato/ambiente/:idAmbiente',controller.getAnAmbiente);



module.exports = router;