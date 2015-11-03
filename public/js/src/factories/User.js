export default function (app) {
  app.factory('User', function($http) {
    var model = {};
    var endPoint = '/api/users';
    
    model.create = (credentials) => {
      return $http.post(endPoint, credentials);
    };
    
    return model;
  });
}