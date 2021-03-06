var router = require('koa-router')();
var parse = require('co-body');
var requireAuth = require('../../middleware/requireAuth');
var resource = require('../../middleware/resource');
var comments = require('./comments');

module.exports = function(Submission, Comment, User) {

  // provide the comments resource the Comment model
  comments = comments(Comment);

  router.get('/submissions', function* () {
    yield Submission
      .fetchAll({ require: true, withRelated: ['user', 'comments', 'likes'] })
      .then(data => {

        var submissions = data.serialize();

        var lengs = submissions.map(entry => {
          return entry.comments.length;
        });

        var slimedSubmissions = submissions.map((sub, i) => {
          sub.comments = lengs[i];
          return sub;
        });


        if(this.Auth) {

          var withLikeStatuses = slimedSubmissions.map(sub => {

            var hasLiked = sub.likes.filter(like => like.user_id === this.Auth.userId).length > 0;

            return Object.assign(sub, { hasLiked: hasLiked });

          });

          this.body = withLikeStatuses.reverse();

        } else {

          this.body = slimedSubmissions.reverse();

        }

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


  router.post('/submissions/:subId/likes', requireAuth(), function* () {
    var user = yield User.forge({ id: this.Auth.userId }).fetch();

    var hasLiked = yield user.canLikeSubmission(this.params.subId);

    if(hasLiked) {

      yield user.unlikeSubmission(this.params.subId);

      this.body = { message: 'disliked', likes: false };

    } else {

      yield user.likeSubmission(this.params.subId);

      this.body = { message: 'liked', likes: true };

    }


  });

  router.use('/submissions/:subId/comments', comments.routes());

  return router;
}
