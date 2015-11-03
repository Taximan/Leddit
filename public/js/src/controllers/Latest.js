export default function (app) {
  app.controller('LatestController', function($scope) {
    $scope.msg = 'from the latest controller';
  });
}