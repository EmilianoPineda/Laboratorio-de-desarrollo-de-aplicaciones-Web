let express = require('express')
let router = express.Router()
let bicicletaController = require('../../controllers/api/bicicletaControllerAPI')

// API GET, get all bicis
router.get('/', bicicletaController.bicicleta_list) 

// API POST, create a bicis
router.post('/create', bicicletaController.bicicleta_create)

// API POST, delete a bici 
router.post('/delete', bicicletaController.bicicleta_delete)

module.exports = router