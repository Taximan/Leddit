var router = require('koa-router')();
var parse = require('co-body');
var jwt = require('jsonwebtoken');
var requireRequest = require('../../middleware/requireRequest');

module.exports = function(User, secret) {

  router.post('/auth', requireRequest(['username', 'password']), function* () {

    yield User.forge({ name: this.parsedRequest.username, password: this.parsedRequest.password })
      .fetch({ require: true })
      .then((model) => { 
        
        var claim = {
          userId: model.serialize().id,
          username: model.serialize().name
        };

        this.body = { token: jwt.sign(claim, secret) };
      })
      .catch((e) => { 
        this.status = 401;
        this.body = { message: 'invalid username or password, try again.' };
      })

  });

  return router;
};