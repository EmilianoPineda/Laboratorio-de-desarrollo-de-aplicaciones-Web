var express = require('express');
var router = express.Router();
let bicicletaController = require('../controllers/bicicleta')

/* Listar las bicicletas. */
router.get('/', bicicletaController.bicicleta_list);

/* Añadir una bicicleta */
router.get('/create', bicicletaController.bicicleta_create_get)
router.post('/create', bicicletaController.bicicleta_create_post)

// Eliminar bicicleta
router.post('/:id/delete', bicicletaController.bicicleta_delete_post)


module.exports = router;
  