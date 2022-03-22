/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema
      .createTable('products', (table) => {
        table.increments('id');
        table.string('name', 255).notNullable();
        table.string('description', 512).notNullable();
        table.float('price');
        table.timestamps(true, true);
      });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = function(knex) {
    return knex.schema
      .dropTable('products');
  };
