const assert = require('assert');
const mongoose = require('mongoose');
const { isReadStream } = require('request/lib/helpers');
const Bicicleta = require('../models/bicicleta');
const request = require('request');
let base_url = 'http://localhost:3000/api/bicicletas';
const Usuario = require('../models/usuario');
const Reserva = require('../models/reserva');

describe('Tests de Mocha', function () {
    beforeEach(function(done){
        var mongoDB = 'mongodb://localhost:27017/red_bicicletas'
        mongoose.connect(mongoDB, {useNewUrlParser: true})

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open', function(){
            //console.log('Connected to the test database')
            done()
        })
    })

    afterEach(function(done){
        
        Reserva.deleteMany({}, function(err, success){
            if(err) console.log(err)
            Usuario.deleteMany({}, function(err, success){
                if(err) console.log(err)
                Bicicleta.deleteMany({}, function(err, success){
                    if(err) console.log(err)
                    const db = mongoose.connection
                    db.close()
                    done()
                })
            })
        })
        
    })
    describe('bicicleta_api.spec.js', function(){
        describe('GET BICICLETAS /', () => {
            it('Status 200', (done) => {
                request.get(base_url, function(error, response, body) {
                    console.log(response)
                    let res = JSON.parse(body)
                    assert.equal(response.statusCode, 200);
                    let bicis_num = res.bicicletas.length;
                    assert.equal(bicis_num, 0);
                    done()
                })
            })
        })

        describe('POST BICICLETA /create', () => {
            it('Status 200', (done) => {
                let headers = {'content-type' : 'application/json'}
                let aBici = '{"code" : 3, "color": "green", "modelo": "bmx", "lat": -99.13, "lon": 19.28}'
                request.post({
                    headers: headers,
                    url: base_url + 'create',
                    body: aBici
                }, (error, response, body) => {
                    assert.equal(response.statusCode, 200);
                    let bici = JSON.parse(body).bicicleta
                    assert.equal(bici.color, 'green');
                    assert.equal(bici.ubicacion[0], -99.13)
                    assert.equal(bici.ubicacion[1], 19.28)

                    done()
                })
            })
        })
    })
    
    describe('bicicleta_test.spec.js', function(){

        describe('Bicicletas.allBicis', function(){
            it('Comienza vacía', (done) => {
                Bicicleta.allBicis(function(err, bicis){
                    assert.equal(bicis.length, 0);
                    done()
                })
            });
        });
    
        describe('Bicicletas.createInstance', function(){
            it('Crear instancia de una bicicleta', function (){
                let bici = Bicicleta.createInstance(1, 'verde', 'urbana', [19.28, -99.13])
                assert.equal(bici.code, 1);
                assert.equal(bici.color, 'verde');
                assert.equal(bici.modelo, 'urbana');
                assert.equal(bici.ubicacion[0], 19.28);
                assert.equal(bici.ubicacion[1], -99.13);
            });
        });
    
        describe('Bicicletas.add', ()=>{
            it('Agregar una bici', (done)=>{
                let bici = new Bicicleta({code: 1, color: 'verde', modelo: 'urbana'})
                Bicicleta.add(bici, function(err, newBici){
                    if(err) console.log(err)
                    Bicicleta.allBicis(function(err, bicis){
                        assert.equal(bicis.length, 1);
                        assert.equal(bicis[0].code, bici.code);
    
                        done();
                    });
                });
            });
        });

        describe('Bicicletas.findByCode', ()=>{
            it('Encontrar bici por codigo', (done)=>{
                Bicicleta.allBicis(function(err, bicis){
                    assert.equal(bicis.length, 0);
    
                    let bici = new Bicicleta({code: 1, color: 'verde', modelo: 'urbana'})
                    Bicicleta.add(bici, function(err, newBike){
                        if(err) console.log(err)
    
                        let bici2 = new Bicicleta({code: 2, color: 'blanca', modelo: 'montaña'})
                        Bicicleta.add(bici2, function(err, newBike){                        
                            if(err) console.log(err)
    
                            Bicicleta.findByCode(1, function(err, targetBici){

                                assert.equal(targetBici.code, bici.code)
                                assert.equal(targetBici.color, bici.color)
                                assert.equal(targetBici.modelo, bici.modelo)
    
                                done()
                            });
                        });
                    });
                });
            });
        });

        describe('Bicicleta.removeByCode', ()=>{
            it('Eliminar bicicleta', (done)=>{
                Bicicleta.allBicis(function(err, bicis){
                    assert.equal(bicis.length, 0);
    
                    let bici = new Bicicleta({code: 1, color: 'verde', modelo: 'urbana'})
                    Bicicleta.add(bici, function(err, newBike){
                        if(err) console.log(err)
                        Bicicleta.allBicis(function(err, bicis){
                            assert.equal(bicis.length, 1);
                            Bicicleta.removeByCode(1, function(err, cb){
                                Bicicleta.allBicis(function(err, bicis){
                                    assert.equal(bicis.length, 0)
                                
                                    done()
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    describe('usuario_test.spec.js', function(){
        describe('Usuario.reservar', ()=>{
            it('Usuario reserva una bicicleta', (done)=>{
                let usuario = new Usuario({nombre: 'Luis', password: 'miSuperPass1287word', email: 'luis@yo.com'})
                usuario.save()
                let bicicleta = new Bicicleta({code: 1, color: 'verde', modelo: 'urbana'})
                bicicleta.save()
                let hoy = new Date()
                let mañana = new Date()
                mañana.setDate(hoy.getDate()+1)

                usuario.reservar(bicicleta.id, hoy, mañana, function(err, reserva){
                    Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err, reservas){
                        //console.log(usuario.nombre)
                        assert.equal(reservas.length, 1)
                        assert.equal(reservas[0].diasDeReserva(), 2)
                        assert.equal(reservas[0].bicicleta.code, 1)
                        assert.equal(reservas[0].usuario.nombre, usuario.nombre)
                        done()
                    })
                })
            })
        });
    });

});
