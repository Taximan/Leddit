export default function (app) {
  app.filter('httpify', function() {
    return function (link) {
      var result;
      var http = 'http://';
      var https = 'https://';
      
      if(link.startsWith(http) || link.startsWith(https)) {
        return link; // do nothing
      }
      
      return http + link;
    
    };
  }); 
}