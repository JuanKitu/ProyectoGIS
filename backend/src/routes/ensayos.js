const {Router} = require('express');
const router = Router();
const controller = require('../controllers/ensayo.controllers');
router.get('/',controller.getAll);
router.get('/:idEnsayo',controller.getById);
router.post('/',controller.new);
router.delete('/:idEnsayo',controller.delete);
router.put('/:idEnsayo',controller.change);




module.exports = router;