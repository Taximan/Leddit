var router = require('koa-router')();
var parse = require('co-body');
var _ = require('lodash');
var requireAuth = require('../../middleware/requireAuth');
var resource = require('../../middleware/resource');

module.exports = function (Comment) {
  
  router.get('/comments', resource.fetchAll(Comment, ['user']))
  router.get('/comments/:id', resource.fetchOne(Comment, ['user']));

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

    

  return router;
}