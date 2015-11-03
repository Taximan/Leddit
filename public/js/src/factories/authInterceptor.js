export default function (app) {
  app.factory('authInterceptor', function ($window) {
    return {
      request(config) {
        if($window.localStorage.token) {
          config.headers.Authorization = `Bearer ${$window.localStorage.token}`;
        }
        return config;
      }
    };
  }); 
}