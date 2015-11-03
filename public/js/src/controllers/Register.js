export default function (app) {
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
}