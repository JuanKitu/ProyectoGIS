const {Router} = require('express');
const router = Router();
const controller = require('../controllers/parametros_archivados.controllers');
router.get('/',controller.getAll);
router.get('/:idParametro',controller.getById);
router.delete('/:idParametro',controller.delete);




module.exports = router;