
/*
| Core modules
*/

var Promise = require('bluebird');
var Resource = require('koa-router');
var app = require('koa')();
var router = require('koa-router')();
var parse = require('co-body');
var jwt = require('jsonwebtoken');
var secret = require('./config').APP_SECRET;

/*
| Database related modules
*/

var knexConfig = process.env.NODE_ENV === 'production' ?  require('./database/knexfile').production : require('./database/knexfile').development;
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('visibility');

var models = require('./models/index')(bookshelf);
var User = models.User;
var Submission = models.Submission;

/*
| Routes
*/

function NotFoundError(context) {
  context.status = 404;
  context.body = {
    message: 'No such resource'
  };
}

router.get('/', function* () {
  this.body = {
    message: 'welcome to the API',
    resources: ['users', 'submissions', 'comments']
  }
});

router.get('/users', function* () {
  yield User
    .fetchAll({ require: true })
    .then(users => this.body = users.toJSON())
    .catch(err => this.body = err);
});

router.post('/users', function* () {
  var request = yield parse(this);
  if(request && request.username && request.password && request.email) {

    yield new User({ name: request.username, password: request.password, email: request.email })
      .save()
      .then(() => {
        this.body = { message: 'user successfully registered.' };
      })
      .catch((err) => {
        this.status = 403;
        this.body = { message: 'user with this name or email already exists.' };
      });

  } else { 
    this.status = 400;
    this.body = { message: 'missing one of username|password|email fields' };
  }
});

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

router.get('/users/:id', function* () {
  var userId = this.params.id;

  yield User.forge({ id: userId })
    .fetch({ require: true, withRelated: ['submissions']})
    .then(user => this.body = user.toJSON())
    .catch(err => NotFoundError(this));
});

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
    .catch(err =>  NotFoundError(this));
});



/*
| Middleware
*/


var verify = require('./middleware/verify');
  

app.use(verify(secret));
app.use(router.routes());


/*
| Bootstrap app
*/

var port = process.env.PORT || 3000;
app.listen(port);
console.log(`app attached to localhost:${port}`);



