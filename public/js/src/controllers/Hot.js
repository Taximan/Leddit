export default function (app) {
  app.controller('HotController', function($scope, submissions) {
    $scope.msg = 'from the hot controller';
    $scope.submissions = submissions;
  });
}