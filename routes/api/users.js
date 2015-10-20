var router = require('koa-router')();
var parse = require('co-body');

module.exports = function(User) {
  
    router.get('/users', function* () {
      yield User
        .fetchAll({ require: true })
        .then(users => this.body = users.toJSON())
        .catch(err => this.body = err);
    }); 


    router.get('/users/:id', function* () {
      var userId = this.params.id;

      yield User.forge({ id: userId })
        .fetch({ require: true, withRelated: ['submissions']})
        .then(user => this.body = user.toJSON())
        .catch(err => {
          this.status = 404;
          this.body = {
            message: 'no such resource'
          };
        });

    });

    router.post('/users', function* () {
      var request = yield parse(this);

      if(request && request.username && request.password && request.email) {

        yield new User({ name: request.username, password: request.password, email: request.email })
          .save()
          .then(() => {
            this.body = { message: 'user successfully registered.' };
          })
          .catch((err) => {
            this.status = 403;
            this.body = { message: 'user with this name or email already exists.' };
          });

      } else { 
        this.status = 400;
        this.body = { message: 'missing one of username|password|email fields' };
      }
    });


    return router;
};