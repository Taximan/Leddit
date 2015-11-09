
/*
| Core modules
*/

var app = require('koa')();
var serve = require('koa-static');
var secret = require('./config').APP_SECRET;


/*
| Database related modules
*/

var knexConfig = process.env.NODE_ENV === 'production' ?  require('./database/knexfile').production : require('./database/knexfile').development;
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('visibility');


/*
| Models
*/
var models = require('./models/index')(bookshelf);
var User = models.User;
var Submission = models.Submission;
var Comment = models.Comment;


/*
| Middleware
*/

var verify = require('./middleware/verify');

app.use(serve('./public'));
app.use(verify(secret));


/*
| Routes
*/

var users = require('./routes/api/users')(User);
var submissions = require('./routes/api/submissions')(Submission, Comment, User);
var auth = require('./routes/api/auth')(User, secret);

app.use(users.prefix('/api').routes());
app.use(submissions.prefix('/api').routes());
app.use(auth.prefix('/api').routes());

/*
| Bootstrap app
*/

var port = process.env.PORT || 3000;
app.listen(port);
console.log(`app attached to localhost:${port}`);



