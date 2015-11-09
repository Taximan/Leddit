export default function (app) {
  app.factory('Like', function ($http) {
    
    return function (entity) {
      var model = {};
      
      model.endpoint = (id) => `${entity}/${id}/likes`;
      
      model.likeById = (id) => $http.post(model.endpoint(id));
          
      return model;
    }
    
  });
}