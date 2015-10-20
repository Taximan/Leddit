var router = require('koa-router')();
var parse = require('co-body');
var requireAuth = require('../../middleware/requireAuth');

module.exports = function(Submission) {

  router.get('/submissions', function* () {
    yield Submission
      .fetchAll({ require: true, withRelated: ['user']})
      .then(submissions => this.body = submissions.toJSON())
      .catch(err => this.body = err);
  });

  router.post('/submissions', requireAuth(), function* () {
    var requestBody = yield parse(this);

    if(requestBody && requestBody.title && requestBody.description && requestBody.link_to) {

      var newSumission = {
        title: requestBody.title,
        description: requestBody.description,
        link_to: requestBody.link_to,
        user_id: this.Auth.userId
      }

      yield new Submission(newSumission)
        .save()
        .then(() => {
          this.body = {
            message: 'saved'
          };
        })
        .catch(e => {
          console.log('[ERROR] failed to write to DB', e);
          this.status = 500;
          this.body = { message: 'opps, looks like something went wrongm, try again latter.' };   
        });

    } else {
      
      this.status = 400;
      this.body = { message: 'missing one of title|description|link_to fields' };

    }

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