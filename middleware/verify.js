/*
| verify middlewere
|  
| this middlewere checks if the request contains an valid token
| if so it will append the .Auth property to the context
| if not it will just let the request just throught
| 
*/
var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
var verify = Promise.promisify(jwt.verify);

/**
 * [authorizes each request]
 * @param  {String}
 * @return {Generator}
 */
module.exports = function verifyRequest(secret) {
  return function* (next) {

    if(this.get('Authorization')) {

    var token = this.get('Authorization').split(' ')[1]; 

    try {

      this.Auth = yield verify(token, secret);

    } catch (err) {

      // if the user has an invalid token then we will treat him as unsigned.
      console.log('[WARNING] somebody tired to use an invalid token');
  
    }

    yield next;

    } else {

      yield next;

    }

  };
};