export default function (app) {
  app.factory('Submissions', function($http, $location) {
    var model = {};
    var cache = {};
    var endpoint = '/api/submissions';
    
    model.getSubmissions = () => {
      if(cache['submissions']) return Promise.resolve(cache['submissions']);
      else return $http.get(endpoint).then(raw => raw.data).then(data => {
        cache['submissions'] = data;
        return Promise.resolve(data);
      });
    };
    
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