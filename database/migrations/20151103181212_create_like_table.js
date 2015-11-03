
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('submission_likes', function(table) {
      table.increments('id').primary();
      table.integer('submission_id').references('id').inTable('submissions');
      table.integer('user_id').references('id').inTable('users');
    });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('submission_likes');
};
