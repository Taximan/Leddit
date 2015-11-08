
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('likes', function (table) {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.integer('likeable_id');
      table.string('likeable_type');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('likes');
};
