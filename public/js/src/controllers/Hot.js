export default function (app) {
  app.controller('HotController', function($scope, submissions, Submissions) {
    $scope.msg = 'from the hot controller';
    $scope.submissions = submissions;

    $scope.likeSub = (subId) => {
      Submissions.likeById(subId)
        .then(r => console.log(r.data));
    };


  });
}