
/*
|
| Bookshelf models contained in this file
|  | User
|  | Submission
|  | Comment
| 
| Todo
|  | split into multiple files
|
*/

module.exports = function(bookshelf) {

  var exports = {};

  /*
  | User Model
  */

  exports.User = bookshelf.Model.extend({
    tableName: 'users',
    hasTimestamps: true, 
    hidden: ['password'],

    submissions: function() {
      return this.hasMany(exports.Submission);
    },
    comments: function() {
      return this.hasMany(exports.Comment);
    }
  });

  /*
  | Submission Model
  */

  exports.Submission = bookshelf.Model.extend({
    tableName: 'submissions',
    hasTimestamps: true, 
    
    user: function() {
      return this.belongsTo(exports.User);
    },
    comments: function() {
      return this.hasMany(exports.Comment);
    }
  });

  /*
  | Comment Model
  */

  exports.Comment = bookshelf.Model.extend({
    tableName: 'comments',
    hasTimestamps: true, 
    
    user: function() {
      return this.belongsTo(exports.User);
    }
  });

  return exports;

}