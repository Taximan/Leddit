export default function (app) {
  app.controller('SubmissionsController', function($scope, submissions, Submissions, Login) {
   
    $scope.submissions = submissions;

    $scope.likeSub = (subId) => {
      Submissions.likeById(subId)
        .then(resp => {

          var likes = resp.data.likes;

          for (var i = $scope.submissions.length - 1; i >= 0; i--) {
            if($scope.submissions[i].id === subId) {

              $scope.submissions[i].hasLiked = likes;

              if(!$scope.submissions[i].hasLiked) {

                $scope.submissions[i].likes = $scope.submissions[i].likes.filter(s => s.user_id != Login.userId);

              } else {

                $scope.submissions[i].likes.push({ user_id: Login.userId });

              }

            }
          };

        });
    };


  });
}
