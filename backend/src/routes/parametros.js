const {Router} = require('express');
const router = Router();
const controller = require('../controllers/parametros.controllers');
router.get('/',controller.getAll);
router.get('/:idParametro',controller.getById);
router.post('/',controller.new);
router.delete('/:idParametro',controller.delete);
router.put('/:idParametro',controller.change);




module.exports = router;