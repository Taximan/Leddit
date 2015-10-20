var router = require('koa-router')();
var parse = require('co-body');
var jwt = require('jsonwebtoken');

module.exports = function(User, secret) {

  router.post('/auth', function* () {
    
    var request = yield parse(this);

    if(request && request.username && request.password) {

      yield User.forge({ name: request.username, password: request.password })
        .fetch({ require: true })
        .then((model) => { 
          
          var claim = {
            userId: model.serialize().id
          };

          this.body = { token: jwt.sign(claim, secret) };
        })
        .catch(() => { 
          this.status = 401;
          this.body = { message: 'invalid username or password, try again.' };
        })

    } else {
      this.status = 400;  
      this.body = { message: 'missing one of username|password' };
    }

  });

  return router;
};