var mongoose = require('mongoose');

var studentSchema = {
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  phone: { type: Number, required: true},
  status: { type: String, required: true},
  medicalInfo: {
      foodAllergies: [{ type: String }],
      medicalAllergies: [{ type: String}],
      medicalNeeds: { type: String },
      medicalAdminPermission: { type: Boolean, required: true }
  },
  emergencyContact: {
    emFirstName: { type: String, required: true },
    emLastName: { type: String, required: true },
    emPhone: { type: Number, required: true },
    relationship: { type: String, required: true}
  },
  guardians: [{
    firstName: { type: String, required: true},
    lastName: { type: String, required: true },
    relationship: { type: String, required: true},
    codeword: { type: String, required: true}
  }]

};


var schema = new mongoose.Schema(studentSchema);

module.exports = schema;
module.exports.studentSchema = studentSchema;
