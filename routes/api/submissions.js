var router = require('koa-router')();
var parse = require('co-body');

module.exports = function(Submission) {

  router.get('/submissions', function* () {
    yield Submission
      .fetchAll({ require: true, withRelated: ['user']})
      .then(submissions => this.body = submissions.toJSON())
      .catch(err => this.body = err);
  });

  router.get('/submissions/:id', function* () {
    var subId = this.params.id;

    yield Submission.forge({ id:  subId})
      .fetch({ require: true, withRelated: ['user', 'comments', 'comments.user'] })
      .then(subs => this.body = subs.toJSON())
      .catch(err =>  {
        this.status = 404;
        this.body = {
          message: 'no such resource'
        };
      });
  }); 

  return router;
}