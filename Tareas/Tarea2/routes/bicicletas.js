var express = require('express');
var router = express.Router();
let bicicletaController = require('../controllers/bicicleta')
let bicicletaValidator = require('../validators/BikeValidator');

router.get('/', bicicletaController.bicicleta_list);
router.get('/create', bicicletaController.bicicleta_create_get)
router.post('/create', bicicletaValidator.store, bicicletaController.bicicleta_create_post);
router.get('/:id/update', bicicletaController.bicicleta_update_get)
router.post('/:id/update', bicicletaController.bicicleta_update_post)
router.post('/:id/delete', bicicletaController.bicicleta_delete_post)


module.exports = router;
