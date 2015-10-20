exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name').unique();
      table.string('email').unique();
      table.text('password');
      table.timestamps();   
    })
    .createTable('submissions', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.string('title');
      table.text('description');
      table.text('link_to');
      table.timestamps();
    })
    .createTable('comments', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.integer('submission_id').references('id').inTable('submissions');
      table.text('body');
      table.timestamps();
    })
};

exports.down = function(knex, Promise) {
  return knex.schema  
    .dropTable('comments')
    .dropTable('submissions')
    .dropTable('users')
};
