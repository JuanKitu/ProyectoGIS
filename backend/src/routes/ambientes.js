const {Router} = require('express');
const router = Router();
const controller = require('../controllers/ambiente.controllers');
router.get('/',controller.getAll);
router.get('/:idAmbiente',controller.getById);
router.post('/',controller.new);
router.delete('/:idAmbiente',controller.delete);
router.put('/:idAmbiente',controller.change);




module.exports = router;