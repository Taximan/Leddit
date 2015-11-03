/*
| appends 's when needed
| example 
| 1 comment
| 2 comments <--
*/

export default function (app) {
  app.filter('plurify', function() {
    return function (len, word) {
      if(len === 1) {
        return `${len} ${word}`;
      } else {
        return `${len} ${word}s`;
      }
    }
  })
}