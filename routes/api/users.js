var router = require('koa-router')();
var parse = require('co-body');
var resource = require('../../middleware/resource');

module.exports = function(User) {
  
    router.get('/users', resource.fetchAll(User, []));
    
    router.get('/users/:username', function* () {
      yield User.forge({name: this.params.username})
        .fetch({ require: true, withRelated: ['submissions'] })
        .then(data => this.body = data.toJSON())
        .catch(err => {
          this.status = 404;
          this.body = { message: 'not found' };  
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