export default function (app) {
  app.controller('NewSubmissionController', function($scope, Submissions, $location) {
    
    $scope.newSubmission = {
      title: '',
      description: '',
      link_to: ''
    };
    
    // if something goes wrong in the server side eg db write error
    $scope.backEndMsg = ''; 
    
    $scope.submit = () => {
      Submissions.create($scope.newSubmission)
        .then(resp => {
          $location.path(`/submission/${resp.data.id}`);
        })
        .catch(e => {
          console.log(e);    
        })
    };
    
  });
}