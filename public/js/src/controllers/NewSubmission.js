export default function (app) {
  app.controller('NewSubmissionController', function($scope, Submissions) {
    
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
          console.log(resp);
        })
        .catch(e => {
          console.log(e);    
        })
    };
    
  });
}