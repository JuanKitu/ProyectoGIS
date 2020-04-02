const {Router} = require('express');
const router = Router();
const controller = require('../controllers/probeta.controllers');
router.get('/',controller.getAll);
router.get('/:idProbeta',controller.getById);
router.post('/',controller.new);
router.delete('/:idProbeta',controller.delete);
router.put('/:idProbeta',controller.change);




module.exports = router;