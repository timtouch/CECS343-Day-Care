var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');

module.exports = function(wagner){
  var api = express.Router();

  api.use(bodyparser.json());

  // Get a student given their first name
  api.get('/student/firstName/:firstName', wagner.invoke(function(Student) {
    return function(req, res) {
      Student.findOne({ firstName: req.params.firstName}, function( error, student ) {
        if (error) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: error.toString() });
        }
        if (!student) {
          return res.
            status(status.NOT_FOUND).
            json({ error: 'Not found' });
        }
        res.json( { student: student })
      });
    };
  }));

  // Get list of all students from DB
  api.get('/student', wagner.invoke(function(Student) {
    return function(req, res) {
      Student.find({}, function(error, students){
        if (error) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: error.toString() });
        }
        if (!students) {
          return res.
            status(status.NOT_FOUND).
            json({ error: 'Not found' });
        }
        res.json( {students: students });
      });
    };
  }));

  //TODO: Allow users to add new students
  api.post('/student', wagner.invoke(function(Student){
    return function (req, res) {
      Student.create(req.body, function(err, student) {
        if(err){
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: error.toString() });
        }
        return res.json({ student: student });
      });
    };
  }));

  return api;
};
