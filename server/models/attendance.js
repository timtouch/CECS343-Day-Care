var mongoose = require('mongoose');

var attendanceSchema = {
  attendanceDate: { type: Date, required: true },
  students: [{
    firstName: { type:String, required: true },
    lastName: { type: String, required: true },
    attendance: { type: String, enum: ['Present', 'Absent', 'Tardy'], required: true },
    notes: { type: String, required: false}
  }]
};

var schema = new mongoose.Schema(attendanceSchema);

module.exports = schema;
module.exports.studentSchema = attendanceSchema;
