var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner){
  mongoose.Promise = global.Promise;

  mongoose.connect('mongodb://localhost:27017/test');

  var Student =
    mongoose.model('Student', require('./student'), 'students');

    var models = {
        Student: Student
    }


  _.each(models, function(value, key){
      wagner.factory(key, function() {
        return value;
      });
  });

  return models;
};
