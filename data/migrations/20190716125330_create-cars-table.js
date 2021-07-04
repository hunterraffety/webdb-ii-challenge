exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments(); // primary key
    tbl.string('make', 128).notNullable();
    tbl.string('model', 128).notNullable();
    tbl.string('vin').notNullable();
    tbl.decimal('mileage').notNullable();
    tbl.string('transmission_type', 128).nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
