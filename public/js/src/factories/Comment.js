export default function (app) {
  app.factory('Comment', function($http) {
    var model = {};
    
    var endpoint = (subId) => `/api/submissions/${subId}/comments`;
    
    model.getOne = (subId, comId) => {
      return $http.get(`${endpoint(subId)}/${comId}`)
        .then(res => res.data);
    };
    
    model.create = (props) => {
      return $http.post(endpoint(props.subId), props)
        .then(res => {
          var comId = res.data.id;
          return model.getOne(props.subId, comId);
        });
    }
    
    return model;
  });
}