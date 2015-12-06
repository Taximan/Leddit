import {placeCaretAtEnd} from '../utils.js';

export default function (app) {
  app.controller('SubmissionDetailViewController', function (submission, $scope, Comment, Submissions, Login) {
    $scope.sub = Object.assign({}, submission, {
      // unlike on AllSubmissions view I'm doing it here insteed of generating on the server
      // because cba makign a custom endpoint
      // the client should be able to manage it
      hasLiked: !!(submission.likes.filter(s => Login.userId == s.user_id)).length
    });
    
    $scope.newcomment = '';
    $scope.Login = Login;
    
    $scope.editing = { comId: null };
    
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
    
    $scope.makeCommentEdditable = (comId) => {
      // filfy DOM manipulation in a controller, but I really just want to get it done. 
      
      var target = document.querySelector('[data-comment-id="' + comId + '"]');
      target.setAttribute('contenteditable', "true");
      target.focus();
      placeCaretAtEnd(target);
      $scope.editing.comId = comId;
    };
    
    $scope.editComment = (comId) => {
      var target = document.querySelector('[data-comment-id="' + comId + '"]');
      target.setAttribute('contenteditable', "false");
      $scope.editing.comId = null;
      var nextCommentBody = target.innerHTML;
      Comment.update(submission.id, comId, nextCommentBody);
    };
    
  }); 
}