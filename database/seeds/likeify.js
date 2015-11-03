
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('submission_likes').del(), 

    // Inserts seed entries
    knex('submission_likes').insert({id: 1, submission_id: 1, user_id: 2}),
    knex('submission_likes').insert({id: 2, submission_id: 1, user_id: 1}),
    knex('submission_likes').insert({id: 3, submission_id: 1, user_id: 3})
  );
};
