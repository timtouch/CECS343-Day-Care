var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  mongoose.Promise = global.Promise;
  var mongolabURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test';

  // Connect to specified MongoDB server
  mongoose.connect(mongolabURI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
  });

  // Define Mongoose Models ( [name], [schema], [collection] )
  var Student =
    mongoose.model('Student', require('./student'), 'students');
  var Attendance =
    mongoose.model('Attendance', require('./attendance'), 'attendances');

  var models = {
      Student: Student,
      Attendance: Attendance
  }

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
      wagner.factory(key, function() {
        return value;
      });
  });

  return models;
};
