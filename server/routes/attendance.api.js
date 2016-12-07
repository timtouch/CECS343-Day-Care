var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');


module.exports = function(wagner){
  var api = express.Router();

  api.use(bodyparser.json());
  //======================================================================
  // HANDLES ATTENDANCE API CALLS
  //======================================================================
  // Get attendance of class given a date in format 'yyyy-mm-dd'
  api.get('/attendance/date/:date', wagner.invoke(function(Attendance){
    return function(req, res) {
      Attendance.findOne( { attendanceDate: req.params.date }, function (err, attendance){
        if (err) {
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() });
        }
        if (!attendance) {
          return res.
            status(status.NOT_FOUND).
            json({ error: 'Not found' });
        }
        res.json( { attendance: attendance });
      });
    };
  }));

  //Get all recorded attendance dates
  api.get('/attendance/all', wagner.invoke(function(Attendance){
    return function(req, res) {
      Attendance.find( {}, { attendanceDate: 1 }, function(err, attendanceDates){
        if(err){
          return res.
            status(status.INTERNAL_SERVER_ERROR).
            json({ error: err.toString() });
        }
        if(!attendanceDates){
          return res.
            status(status.NOT_FOUND).
            json({ error: 'None found' });
        }
        res.json({ attendanceDates: attendanceDates });
      });
    };
  }));

  // Insert a new attendance
  api.post('/attendance', wagner.invoke(function(Attendance){
    return function(req, res, next) {
      var attendance = new Attendance(req.body);
      attendance.save(function(err, attendance){
        if(err) { return next(err) }
        res.json(201, attendance);
      });
    };
  }));

  // Update attendace sheet
  api.put('/attendance', wagner.invoke(function(Attendance){
    return function (req, res, next) {
      var attendance = req.body;
      Attendance.update( { attendanceDate: attendance.attendanceDate }, attendance, function(err, numAffected){
        if(err) { return next(err) }
        res.send("Number affected: " + numAffected);
      });
    };
  }));

  return api;
};
