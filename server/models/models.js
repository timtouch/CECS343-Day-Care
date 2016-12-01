var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner){
  mongoose.Promise = global.Promise;
  var mongolabURI = "mongodb://timtouch:KidsInTheCrib@ds155727.mlab.com:55727/daycaredb";//process.env.MONGOLAB_URI || 'mongodb://localhost:27017/test';

  mongoose.connect(mongolabURI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

  var Student =
    mongoose.model('Student', require('./student'), 'students');
  var Attendance =
    mongoose.model('Attendance', require('./attendance'), 'attendances');

  var models = {
      Student: Student,
      Attendance: Attendance
  }

  _.each(models, function(value, key){
      wagner.factory(key, function() {
        return value;
      });
  });

  return models;
};
