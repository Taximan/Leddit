/*
| requireRequest middlewere
*/

var parse = require('co-body');
var _ = require('lodash');



/**
 * passes only requests that have given fields specified in the fieldsRequired param. 
 * If it passes it will created an parsedRequest Object on the context for convinence.
 * @param  {Array} fieldsRequired [the fields that you depend on]
 * @return {Generator}  this is the middleware that will get returned. 
 */
module.exports = function requireRequest(fieldsRequired) {
  return function* (next) {
    var requestbody = yield parse(this);

    if(_.has(requestbody, fieldsRequired))  {
      this.parsedRequest = requestbody;
      yield next;
    } else {
      this.status = 400;
      var missingFieldsString = fieldsRequired.reduce((f1, f2) => f1 + '|' + f2);
      var this.body = { message: `missing one of ${missingFieldsString}.` };
    }
    
  };
}