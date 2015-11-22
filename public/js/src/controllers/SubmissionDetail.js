export default function (app) {
  app.controller('SubmissionDetailViewController', function (submission, $scope, Comment) {
    $scope.sub = submission;
    
    $scope.newcomment = '';
    
    $scope.postNewComment = () => {
      if($scope.newcomment.length) {
        Comment.create({
          body: $scope.newcomment,
          subId: submission.id
        }).then(newComment => {
          $scope.sub.comments.push(newComment);
          $scope.newcomment = '';
        });
      }
    };
    
  }); 
}