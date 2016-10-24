var express = require('express');
var status = require('http-status');

module.exports = function(wagner){
  var api = express.Router();

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
        res.json( { student: student})
      });
    };
  }));

  return api;
};
