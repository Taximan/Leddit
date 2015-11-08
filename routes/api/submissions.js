var router = require('koa-router')();
var parse = require('co-body');
var requireAuth = require('../../middleware/requireAuth');
var resource = require('../../middleware/resource');
var comments = require('./comments');

module.exports = function(Submission, Comment) {
    
  comments = comments(Comment);  
    
  router.get('/submissions', function* () {
    yield Submission
      .fetchAll({ require: true, withRelated: ['user', 'comments'] })
      .then(data => {
        
        var submissions = data.serialize();
        
        var lengs = submissions.map(entry => {
          return entry.comments.length;
        });
        
        var slimedSubmissions = submissions.map((sub, i) => {
          sub.comments = lengs[i];
          return sub;
        });
        
        this.body = slimedSubmissions;
        
      })
      .catch(e => {
        this.status = 500;
        this.err = e;
      });
  });
  router.get('/submissions/:id', resource.fetchOne(Submission, ['user', 'comments', 'comments.user', 'likes.user']));


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
        .then((inserted) => {
          this.status = 201; // created
          this.body = {
            message: 'saved',
            id: inserted.attributes.id
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
  
  router.use('/submissions/:subId/comments', comments.routes());
  
  return router;
}