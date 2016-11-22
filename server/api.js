var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
var _ = require('underscore');

module.exports = function(wagner){
  var api = express.Router();

  api.use(bodyparser.json());

  // Get a student given their id
  api.get('/student/:id', wagner.invoke(function(Student) {
    return function(req, res) {
      Student.findOne({ _id: req.params.id}, function( error, student ) {
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

  //Allow users to add new students
  api.post('/student', wagner.invoke(function(Student){
    return function (req, res, next) {

      var student = new Student(req.body);
      student.save(function(err, student){
        if(err){ return next(err) }
        res.json(201, student);
      });
    };
  }));
  //Update student information
  api.put('/student', wagner.invoke(function(Student){
    return function (req, res, next) {
      var student = req.body;
      Student.update({ _id: student._id }, student, function( err, numAffected ){
        if(err) { return next(err) }
        res.send('Number affected: ' + numAffected);
      });
    };
  }));

  return api;
};
