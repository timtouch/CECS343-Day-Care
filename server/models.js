var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner){
  mongoose.Promise = global.Promise;
  //NOTE: username: timtouch password: KidsInTheCrib
  var mongolabURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test';

  mongoose.connect(mongolabURI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

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
