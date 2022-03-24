/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('bicicletas').del()
    .then(function () {
      return knex('bicicletas').insert([
        {color: 'Azul', modelo: 'CCM', lat:19.284770943610578 , lon:-99.13729060406136 },
        {color: 'Rojo', modelo: 'Costco', lat: 19.2887513, lon:-99.1319755 },
        {color: 'Blanco', modelo: 'Sanborns', lat:19.2879213 , lon: -99.1306226}
      ]);
    })
};
