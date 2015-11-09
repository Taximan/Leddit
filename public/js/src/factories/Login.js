import { decodeToken } from '../utils';

export default function (app) {
  app.factory('Login', function ($window, $http) {
    const endPoint = 'api/auth';
    
    return {
      isLoggedIn: !!$window.localStorage.token,
      username: (this.isLoggedIn && decodeToken($window.localStorage.token).claim.username) || '',
      
      attempt(credentials) {
        return $http.post(endPoint, credentials)
          .then(resp => {
            var token = resp.data.token;
  
            $window.localStorage.token = token;
            this.isLoggedIn = true;
            this.username = credentials.username;
            
            return Promise.resolve(true);
          });  
      },
      
      logout() {
        this.isLoggedIn = false;
        delete $window.localStorage.token;
      }
      
    };
    
  }); 
}