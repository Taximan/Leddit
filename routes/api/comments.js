var router = require('koa-router')();
var parse = require('co-body');
var _ = require('lodash');
var requireAuth = require('../../middleware/requireAuth');

module.exports = function (Comment) {

  router.get('/comments', function* () {
    yield Comment
      .fetchAll({ require: true, withRelated: ['user'] })
      .then(comments => this.body = comments.toJSON())
      .catch(err => this.body = err);
  });

  router.post('/comments/:submission', requireAuth(), function* () {
    var subId = this.params.submission;
    var requestBody = yield parse(this);

    if(_.has(requestBody, ['body'])) {

      var newComment = {  body: requestBody.body, user_id: this.Auth.userId,  submission_id: subId };

      yield new Comment(newComment)
        .save()
        .then(() => {
          this.body = { message: 'saved' };
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

  router.get('/comments/:id', function* () {
    var commentId = this.params.id;

    yield Comment.forge({ id: commentId })
      .fetch({ require: true, withRelated: ['user'] })
      .then(comments => this.body = comments.toJSON())
      .catch(err => {
        this.status = 404;
        this.body = {
          message: 'no such resource'
        };
      });
  });

  return router;
}