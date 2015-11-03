export default function (app) {
  app.factory('SubmissionLike', function ($http) {
    var model = {};
    
    const endpoint = (subId) => `/api/submissions/${subId}/likes`;
    
    /* like post and fetch refreshed likes */
    model.like = (submissionId) => $http.post(endpoint(submissionId))
      .then(resp => $http.get(endpoint(submissionId)));
    
    
    
    return model;
    
  });
}