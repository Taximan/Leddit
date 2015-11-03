export default function (app) {
  app.controller('NavigationController', function($location, Login) {
    var vm = this;
    vm.isActive = (route) => $location.path() === route;
    vm.Login  = Login;
    return vm;
  });
}