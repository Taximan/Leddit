/*
| This is an helper middleware for simple resources
*/

var exports = {};

/**
 * Fetches all data from the model
 * @param  {BookshelfModel} Model  The model to use
 * @param  {Array} related Relatinshipts to be resolved
 * @return {Generator}  The route handler
 */
exports.fetchAll = function(Model, related) {
  return function* () {
    yield Model
      .fetchAll({  require: true, withRelated: related })
      .then(data => this.body = data.toJSON())
      .catch(err => {
        this.status = 500;
        this.err = err;
      })
  };  
};

/**
 * Fetch one record by id of the given Model, requires /:id in the url.
 * @param  {BookshelfModel} Model  The model to use
 * @param  {Array} related Relatinshipts to be resolved
 * @return {Generator}  The route handler
 */
exports.fetchOne = function(Model, related) {
  return function* () {
    var id = this.params.id;

    yield Model.forge({ id: id })
      .fetch({ require: true, withRelated: related })
      .then(data => this.body = data.toJSON())
      .catch(err => {
        console.log(err);
        this.body = 'oopss..??';
      }); 
  };
};

// exports.createOne = function(Model,  )
  

module.exports = exports;