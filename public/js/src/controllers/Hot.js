export default function (app) {
  app.controller('HotController', function($scope, submissions, SubmissionLike) {
    $scope.msg = 'from the hot controller';
    $scope.submissions = submissions;
    $scope.like = (subId, index) => {
      SubmissionLike.like(subId)
        .then(newLikes => {
          $scope.submissions[index].likes = newLikes;
        });
    }
  });
}