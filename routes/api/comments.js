var router = require('koa-router')();
var parse = require('co-body');
var _ = require('lodash');
var requireAuth = require('../../middleware/requireAuth');

module.exports = function (Comment) {
  
  router.get('/', function*() {
     yield Comment.where('submission_id', this.params.subId)
      .fetchAll()
      .then(data => this.body = data.toJSON())
      .catch( e => this.body = e);  
    
  });
  
  router.post('/', requireAuth(), function* () {
    var subId = this.params.subId;
    var requestBody = yield parse(this);

    if(_.has(requestBody, ['body'])) {

      var newComment = {  body: requestBody.body, user_id: this.Auth.userId,  submission_id: subId };

      yield new Comment(newComment)
        .save()
        .then((saved) => {
          var savedId = saved.attributes.id;
          this.status = 201;
          this.body = { message: 'saved', id: savedId };
        })
        .catch(e => {
          console.log('[ERROR] failed to write to DB', e);
          this.status = 500;
          this.body = { message: 'opps, looks like something went wrongm, try again latter.' };  
        });
      
    } else {
      this.status = 400;
      this.body = { message: 'missing one of body' };
    }

  });
  
  router.put('/:comId', function * () {
    var com = yield Comment.forge({id: this.params.comId}).fetch();
    var newcommentbody = (yield parse(this)).body;
    com.set('body', newcommentbody);
    yield com.save()
      .then(_ => this.body = 'updated')
      .catch(e => this.body = e);    
  });
  
  router.get('/:comId', function* () {
    yield Comment
      .forge({
        submission_id: this.params.subId,
        id: this.params.comId
      })
      .fetch({ withRelated: ['user'] })
      .then(data => this.body = data.toJSON())
      .catch(e => this.body = e);
  });

    

  return router;
}