export default function (app) {
  app.factory('Like', function ($http) {
    
    return function (endpoint) {
      var model = {};
      
      model.endpoint = `${endpoint}/likes`;
      
      model.likeById = (id) => $http.post(model.endpoint);
          
      return model;
    }
    
  });
}