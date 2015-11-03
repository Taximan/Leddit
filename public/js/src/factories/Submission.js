export default function (app) {
  app.factory('Submissions', function($http, $location) {
    var model = {};
    
    var endpoint = '/api/submissions';
    
    model.getSubmissions = () => {
      return $http.get(endpoint).then(raw => raw.data);
    }
    
    model.getById = (id) => {
      return $http.get(`${endpoint}/${id}`)
    };
    
    /* props must contain: title, description, link_to properties */
    model.create = (props) => {
      return $http.post(endpoint, props);
    }
    
    return model;
  });
}