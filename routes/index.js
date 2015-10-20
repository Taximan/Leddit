var router = require('koa-router')();


module.exports = function(User, Submission) {
  var auth = require('./api/auth')(User);
  var submissions = require('./api/submissions')(User);
  var users = require('./api/users')(Submission);

  router.use('/api', auth.routes());
  router.use('/api', submissions.routes());
  router.use('/api', users.routes());


  return router;
}