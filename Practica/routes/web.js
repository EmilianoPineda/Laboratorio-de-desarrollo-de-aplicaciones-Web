let authController = require('../controllers/ProductsController');

router.post('/register', authController.store);