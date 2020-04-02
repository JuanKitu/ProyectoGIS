const {Router} = require('express');
const router = Router();
const controller = require('../controllers/usuario.controllers');
router.get('/',controller.getAll);
router.get('/:idUsuario',controller.getById);
router.post('/',controller.new);
router.delete('/:idUsuario',controller.delete);
router.put('/:idUsuario',controller.change);




module.exports = router;