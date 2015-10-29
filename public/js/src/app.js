/*
| core modules
*/
import angular from 'angular';
import ngRoute from 'angular-route';

/*
| import styles here
| this gets extracted to app.css latter.
*/
import './styling/global.css';
import './styling/nav.css';
import './styling/container.css';
import './styling/submissions.css';
import './styling/form-auth.css';

const app = angular.module('Leddit', [ngRoute]);

app.config(function($routeProvider) {
   
   $routeProvider
    .when('/', {
      redirectTo: '/hot'
    })
    .when('/login', {
      templateUrl: '/templates/login.html'
    })
    .when('/register', {
      templateUrl: '/templates/register.html'  
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
    .when('/latest', {
      templateUrl: '/templates/submissions.html',
      controller: 'LatestController'
    })
    .when('/alltime', {
      templateUrl: '/templates/submissions.html',
      controller: 'AlltimeController'
    });
    
});

app.factory('Submissions', function($http, $location) {
  var model = {};
  var cache = {};
  var endpoint = '/api/submissions';
  
  model.getSubmissions = () => {
    if(cache['submissions']) return Promise.resolve(cache['submissions']);
    else return $http.get(endpoint).then(raw => raw.data).then(data => {
      cache['submissions'] = data;
      return Promise.resolve(data);
    });
  };
  
  return model;
});

app.controller('NavigationController', function($location) {
  var vm = this;
  vm.isActive = (route) => $location.path() === route;
  return vm;
});

app.controller('HotController', function($scope, submissions) {
  $scope.msg = 'from the hot controller';
  $scope.submissions = submissions;
});

app.controller('LatestController', function($scope) {
  $scope.msg = 'from the latest controller';
});

app.controller('AlltimeController', function($scope) {
  $scope.msg = 'from the alltime controller!';
});