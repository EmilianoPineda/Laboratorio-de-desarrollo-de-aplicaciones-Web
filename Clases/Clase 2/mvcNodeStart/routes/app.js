let router = require('express').Router()

let PagesController = require('../controllers/PageController');

router.get('/', PagesController.homepage);

router.get('/about', PagesController.about);

router.get('/example', PagesController.ejemplo);

// router.get('/', (req, res) => {
//     res.send('Home page');
// });

// router.get('/about', (req, res) => {
//     res.send('About us');
// });

module.exports = router;