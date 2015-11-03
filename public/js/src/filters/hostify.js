import { getLocation } from '../utils';

export default function (app) {
  app.filter('hostify', function() {
    return function (url) {
      return getLocation(url).host;
    };
  }); 
}