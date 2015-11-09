export default function (app) {
  app.factory('Submissions', function($http, $location, Like) {
    var model = {};
    
    var endpoint = '/api/submissions';
    
    
      
    model.getSubmissions = () => {
      return $http.get(endpoint).then(raw => raw.data);
    }
    
    model.getById = (id) => {
      return $http.get(`${endpoint}/${id}`)
    };
    
    model.likeById = Like(endpoint).likeById;
 
    
    /* props must contain: title, description, link_to properties */
    model.create = (props) => {
      return $http.post(endpoint, props);
    }
    
    return model;
  });
}