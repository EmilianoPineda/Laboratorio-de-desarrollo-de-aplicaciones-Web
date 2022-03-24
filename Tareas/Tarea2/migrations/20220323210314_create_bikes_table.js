exports.up = function(knex) {
    return knex.schema
      .createTable('bicicletas', (table) => {
        table.increments('id');
        table.string('color', 255).notNullable();
        table.string('modelo', 255).notNullable();
        table.string('lat', 255).notNullable();
        table.string('lon', 255).notNullable();
        table.timestamps(true, true);
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTable('bicicletas');
  };
