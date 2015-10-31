/// <reference path="../../../typings/angularjs/angular.d.ts" />

/*
| core modules
*/
import angular from 'angular';
import ngRoute from 'angular-route';
import { debounce, decodeToken } from './utils';

/*
| import styles here
| this gets extracted to app.css latter.
*/
import './styling/global.css';
import './styling/nav.css';
import './styling/container.css';
import './styling/submissions.css';
import './styling/form.css';

const app = angular.module('Leddit', [ngRoute]);

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
    .otherwise({ 
      templateUrl: '/templates/404.html'
    })
    
});


app.factory('authInterceptor', function ($window) {
  return {
    request(config) {
      if($window.localStorage.token) {
        config.headers.Authorization = `Bearer ${$window.localStorage.token}`;
      }
      return config;
    }
  };
});

app.factory('Login', function ($window, $http) {
  const endPoint = 'api/auth';
  
  return {
    isLoggedIn: !!$window.localStorage.token,
    username: decodeToken($window.localStorage.token).claim.username || '',
    
    attempt(credentials) {
      return $http.post(endPoint, credentials)
        .then(resp => {
          var token = resp.data.token;

          $window.localStorage.token = token;
          this.isLoggedIn = true;
          this.username = credentials.username;
          
          return Promise.resolve(true);
        });  
    },
    
    logout() {
      this.isLoggedIn = false;
      delete $window.localStorage.token;
    }
    
  };
   
});

app.directive('isUnique', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ngModel) {
      var resource = attrs.isUnique;
          
      const evHandler = debounce(e => {
        scope.$apply(() => { 
          var val = e.target.value;
          var target = resource.replace('???', val);
          if(val.length > 0) {
              $http.head(target)
                .then(d => ngModel.$setValidity('ununique', false))
                .catch(e => ngModel.$setValidity('ununique', true));
          } else {
            ngModel.$setValidity('ununique', false)
          }
        });
      }, 200);
      
      elem.on('keyup', evHandler);
    }
  };
});


app.directive('pwMatch', function() {
  return {
    require: 'ngModel',
    scope: {
      otherInputValue: '=pwMatch'
    },
    link: function(scope, elem, attrs, ngModel) {
      ngModel.$validators.pwMatch = modelValue => {
        return scope.otherInputValue.$modelValue === modelValue;
      };
      scope.$watch("otherInputValue", function() {
        ngModel.$validate();
      });  
    } 
  };
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


app.factory('User', function($http) {
  var model = {};
  var endPoint = '/api/users';
  
  model.create = (credentials) => {
    return $http.post(endPoint, credentials);
  };
   
  return model;
});

app.controller('NavigationController', function($location, Login) {
  var vm = this;
  vm.isActive = (route) => $location.path() === route;
  vm.Login  = Login;
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

app.controller('LoginController', function($scope, $http, Login, $location) {
  $scope.errmsg = '';
   
  $scope.credentials = {
    username: '',
    password: ''
  };
  
  $scope.submit = () => {
    Login.attempt($scope.credentials)
      .then(isLoggedIn => {
        $scope.errmsg = '';
        $location.path('/');
      })
      .catch(err => {
        
        $scope.errmsg = err.data.message
        
      });      
  };
});

app.controller('LogoutController', function(Login, $timeout, $location) {
  $timeout(() => {
     Login.logout();
     $location.path('/');
  }, 500);
});

app.controller('RegisterController', function($scope, User, $http, $window, Login, $location) {
  $scope.credentials = {
    username: '',
    email: '',
    password: '',
    passconf: ''
  };
  
  $scope.submit = () => {
    User.create($scope.credentials) // create user
      .then(r => { // login him in wih the registered credentials
        if(r.status === 201) {
          return Login.attempt($scope.credentials);
        }
      })
      .then(() => {
        $location.path('/');
      })
      .catch(e => {
        alert('some wierd error occured, try again.');
        console.log(e);
      });
  }
 
});

app.controller('NewSubmissionController', function($scope) {
  $scope.submit = () => alert('not implemented');
});