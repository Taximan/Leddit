exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('users').del(),
    knex('users').insert({ id: 1, name: 'MarthaRichards', email: 'mrichards0@go.com', password: 'WBYOYGMdWNJn', created_at: new Date, updated_at: new Date }),
    knex('users').insert({ id: 2, name: 'RachelWeaver', email: 'rweaver1@list-manage.com', password: 'WBYOYGMdWNJn', created_at: new Date, updated_at: new Date }),
    knex('users').insert({ id: 3, name: 'NicholasPowell', email: 'npowell2@ow.ly', password: 'khyHQC7', created_at: new Date, updated_at: new Date }),
    knex('users').insert({ id: 4, name: 'TeresaHanson', email: 'thanson3@ucoz.ru', password: 'Asc8iyuo3C', created_at: new Date, updated_at: new Date }),
    knex('users').insert({ id: 5, name: 'BrianStone', email: 'bstone4@google.fr', password: '6kJr92LQl' , created_at: new Date, updated_at: new Date}),

    knex('submissions').del(),
    knex('submissions').insert({ id: 1, user_id: 3, title: 'Cras in purus eu magna vulputate luctus.', description: 'um sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue.', link_to:'http://google.pl', created_at: new Date, updated_at: new Date}),
  
    knex('comments').del(),
    knex('comments').insert({ id: 1, user_id: 1, submission_id: 1, body: 'Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia.', created_at: new Date, updated_at: new Date})

  );
};
