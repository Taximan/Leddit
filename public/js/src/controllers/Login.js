export default function (app) {
  app.controller('LoginController', function($scope, $http, Login, $location, $route) {
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
	  window.location.reload();
        })
        .catch(err => {
          
          $scope.errmsg = err.data.message
          
        });      
    };
  });
}
