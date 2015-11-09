
/*
|
| Bookshelf models contained in this file
|  | User
|  | Submission
|  | Comment
|  | Like
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
    },

    likes: function() {
      return this.hasMany(exports.Like);
    },

    unlikeSubmission: function(subId) {
      // return new exports.Like({ likeable_id: subId, user_id: this.attributes.user_id }).where('likeable_type', 'Submission').destroy();
      return new exports.Like({})
        .where('likeable_type', 'Submission')
        .where('likeable_id', subId)
        .where('user_id', this.attributes.id)
        .destroy();
    },
    
    canLikeSubmission: function(subId) {
      return exports.Submission.forge({ id: subId }).fetch({withRelated: 'likes.user'}).then(submission => {

        var hasliked = (submission.serialize().likes.filter(l => l.user_id === this.attributes.id)).length > 0;
        
        return hasliked;
      })
    },

    likeSubmission: function(subId) {
      return new exports.Like({ user_id: this.attributes.id, likeable_id: subId, likeable_type: 'Submission' }).save();
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
    },
    
    likes: function() {
      return this.morphMany(exports.Like, 'likeable', ['likeable_type', 'likeable_id'], 'Submission');  
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
  
  /*
  | Like Model
  */
  
  exports.Like = bookshelf.Model.extend({
    tableName: 'likes',
    hasTimestamps: false,
    hidden: ['likeable_id', 'likeable_type'],
    
    likeable: function() {
      return this.morphTo('likeable', exports.Submission);
    },
    
    user: function() {
      return this.belongsTo(exports.User);
    }
    
    
  }); 

  return exports;

}