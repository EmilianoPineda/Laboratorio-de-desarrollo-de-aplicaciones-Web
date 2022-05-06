var express = require('express');
const passport = require('../config/passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Login page. */
router.get('/usuarios/login', function(req, res, next) {
  res.render('usuarios/login');
});

router.post('/usuarios', function(req, res, next) {
  passport.authenticate('local', function(err, usuario, info){
    if(err) return next(err)
    if(!usuario) return res.render('usuarios/login', {info})
    req.logIn(usuario, function(err){
      if(err) return next(err)
      return res.redirect('/')
    })
  })(req, res, next)
});

/* Log out page. */
router.get('/logout', function(req, res, next) {
  req.logout()
  res.redirect('/');
});

/* Forgot password. */
router.get('/forgotPassword', function(req, res, next) {
  res.render('session/forgotPassword')
});

/* Forgot password post. */
router.post('/forgotPassword', function(req, res, next) {

});

module.exports = router;
