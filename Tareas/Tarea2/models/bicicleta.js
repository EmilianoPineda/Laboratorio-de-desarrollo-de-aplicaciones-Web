const knex = require('../database/connection');

exports.create = (bici) => {
    return knex('bicicletas')
      .insert({color: bici.color, modelo: bici.modelo, lat: bici.lat, lon: bici.lon });
}

exports.all = () =>{
    return knex.select('*').from('bicicletas');
}

exports.removeById = (aBiciId) =>{
    
    idP = parseInt(aBiciId)
    return knex('bicicletas').where({id: idP}).del();
}

exports.findById = (aBiciId) =>{
    idP = parseInt(aBiciId)
    let aBici = knex.select('*').from('bicicletas').where({id: idP}).first();
    if(aBici){
        console.log(aBici.color)
        return aBici
    }
    else{
        throw new Error(`No existe una bici con el id: ${aBiciId}`)
    }
}

exports.update = (id, bici) => {
    return knex('bicicletas')
      .update(bici)
      .update('updated_at', knex.fn.now())
      .where('id', parseInt(id));
}
