export default function (app) {
  app.controller('LogoutController', function(Login, $timeout, $location) {
    $timeout(() => {
      Login.logout();
      $location.path('/');
    }, 500);
  });
}