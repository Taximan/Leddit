/// <reference path="../../../typings/angularjs/angular.d.ts" />

/*
| core modules
*/
import angular from 'angular';
import moment from 'moment';
import ngRoute from 'angular-route';
import ngMoment from 'angular-moment';
import { debounce, decodeToken } from './utils';

window.angularMoment = ngMoment;
window.moment = moment;

/*
| import styles here
| this gets extracted to app.css latter.
*/
import './styling/global.css';
import './styling/nav.css';
import './styling/container.css';
import './styling/submissions.css';
import './styling/form.css';
import './styling/submission-detail.css';
import './styling/footer.css'

const app = angular.module('Leddit', [ngRoute, 'angularMoment']);

app.config(function($routeProvider, $httpProvider) {
   
   $httpProvider.interceptors.push('authInterceptor');
   
   $routeProvider
    .when('/', {
      redirectTo: '/hot'
    })
    .when('/login', {
      templateUrl: '/templates/login.html',
      controller: 'LoginController'
    })
    .when('/register', {
      templateUrl: '/templates/register.html',
      controller: 'RegisterController'  
    })
    .when('/hot', {
      templateUrl: '/templates/submissions.html',
      controller: 'HotController',
      resolve: {
        submissions: function(Submissions) {
          return Submissions.getSubmissions();
        }
      }
    })
    .when('/logout', {
      controller: 'LogoutController',
      template: 'loggin you out...'
    })
    .when('/latest', {
      templateUrl: '/templates/submissions.html',
      controller: 'LatestController'
    })
    .when('/alltime', {
      templateUrl: '/templates/submissions.html',
      controller: 'AlltimeController'
    })
    .when('/add', {
      templateUrl: '/templates/new.html',
      controller: 'NewSubmissionController'
    })
    .when('/submission/:id', {
      templateUrl: '/templates/submission.html',
      resolve: {
        submission: function($route, Submissions) {
          return Submissions.getById($route.current.params.id)
            .then(resp => resp.data);
        }
      },
      controller: 'SubmissionDetailViewController'
    })
    .otherwise({ 
      templateUrl: '/templates/404.html'
    })
    
});

/*
| Factories
*/
import authInterceptor from './factories/authInterceptor';
import LoginFactory from './factories/Login';
import SubmissionFactory from './factories/Submission';
import CommentFactory from './factories/Comment';
import UserFactory from './factories/User';
import LikeFactory from './factories/Like';

authInterceptor(app);
LoginFactory(app);
SubmissionFactory(app);
CommentFactory(app);
UserFactory(app);
LikeFactory(app);


/*
| Filters
*/

import httpifyFilter from './filters/httpify';
import hostify from './filters/hostify';
import plurify from './filters/plurify';

hostify(app);
httpifyFilter(app);
plurify(app);


/*
| Directives
*/

import isUniqueDirective from './directives/isUnique';
import pwMatchDirective from './directives/pwMatch';

isUniqueDirective(app);
pwMatchDirective(app);


/*
| Controllers
*/

import NavigationController from './controllers/Navigation';
import AlltimeController from './controllers/Alltime';
import HotController from './controllers/Hot';
import LatestController from './controllers/Latest';
import LoginController from './controllers/Login';
import LogoutController from './controllers/Logout';
import NewSubmissionController from './controllers/NewSubmission';
import RegisterController from './controllers/Register';
import SubmissionDetailController from './controllers/SubmissionDetail';

NavigationController(app);
AlltimeController(app);
HotController(app);
LatestController(app);
LoginController(app);
LogoutController(app);
NewSubmissionController(app);
RegisterController(app);
SubmissionDetailController(app);












