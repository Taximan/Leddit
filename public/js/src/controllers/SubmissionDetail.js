export default function (app) {
  app.controller('SubmissionDetailViewController', function (submission, $scope, Comment, Submissions, Login) {
    $scope.sub = Object.assign({}, submission, {
      // unlike on AllSubmissions view I'm doing it here insteed of generating on the server
      // because cba makign a custom endpoint
      // the client should be able to manage it
      hasLiked: !!(submission.likes.filter(s => Login.userId == s.user_id)).length
    });
    
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
    
    $scope.likeSub = (subId) => {
      Submissions.likeById(subId)
        .then(resp => {
    
          var likes = resp.data.likes;
          $scope.sub.hasLiked = likes;
          
          if(likes) {
            $scope.sub.likes.push({ user_id: Login.userId });
          } else {
            $scope.sub.likes = $scope.sub.likes.filter(s => s.user_id != Login.userId);
          }
          
    
        });
    };
    
  }); 
}