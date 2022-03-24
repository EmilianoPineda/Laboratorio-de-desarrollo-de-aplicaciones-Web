let Bicicleta = require('../models/bicicleta')
const { validationResult } = require('express-validator');

exports.bicicleta_list = (req, res) => {
    Bicicleta.all()
        .then((data) => {
            let bicicletas = data;
            res.render('bicicletas/index', {bicis: bicicletas})
        });
}

exports.bicicleta_create_get = function(req, res){
    res.render('bicicletas/create')
}

exports.bicicleta_create_post = (req, res) => {
    // Identifica si hubieron errores en el request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Si los hubieron entonces regresa a la petición anterior
      return res.status(422).json({ errors: errors.array() });
    }
    
    Bicicleta.create({ id: req.body.id, color: req.body.color, modelo: req.body.modelo, lat: req.body.lat, lon: req.body.lon})
    .then((data) => {
        // Indica que la bici fue creada con éxito
        res.redirect('/bicicletas')
      });
    
}

exports.bicicleta_delete_post = function(req, res){
    Bicicleta.removeById(req.params.id)
    .then((data) => {
        // Indica que la bici fue eliminada con éxito
        res.redirect('/bicicletas')
      });
}

exports.bicicleta_update_get = function(req, res){
    Bicicleta.findById(req.params.id)
    .then((data) => {
        res.render('bicicletas/update', {data})
    });
}

exports.bicicleta_update_post = function(req, res){
    let id = req.params.id
    Bicicleta.findById(id).then((bici) =>{
        if (bici == null) {
            // Regresa el error 404
            res.status(404).send('Not found');
            return;
        }
        let updateBici = {
            color: req.body.color,
            modelo: req.body.modelo,
            lat: req.body.lat,
            lon: req.body.lon
          }
        Bicicleta.update(bici.id, updateBici)
        .then((id) => {
            res.redirect('/bicicletas');
        });
    });
}