
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('likes').del(), 

    // Inserts seed entries
    knex('likes').insert({id: 1, user_id: 3, likeable_id: 1, likeable_type: 'Submission'}),
    knex('likes').insert({id: 2, user_id: 5, likeable_id: 1, likeable_type: 'Submission'}),
    knex('likes').insert({id: 3, user_id: 4, likeable_id: 1, likeable_type: 'Submission'})
    
  );
};
