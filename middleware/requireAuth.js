/*
| requireAuth middleware
|
| attach to routes that require authentication
| this depends on a verification middlewere that will assign the this.Auth field
*/

/**
 * [passes only authed users throught]
 * @return {Generator}
 */
module.exports = function requireAuth() {
  return function* (next) {
    if(this.Auth) {
      yield next;
    } else {
      this.status = 401;
      this.body = { message: 'unauthorized' };
    }
  };
} 