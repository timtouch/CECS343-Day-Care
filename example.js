var mongoose = require('mongoose');
var studentSchema = require('./student');

var Student = mongoose.model('Student', studentSchema);

var s = new Student({
  firstName: "Frank",
  lastName: "Sinatra",
  phone: 1203942345,
  status: "Currently Enrolled",
  medicalInfo: {
    foodAllergies: ["Seafood", "Nuts"],
    medicalAllergies: ["Penicillin", "Cough Drops"],
    medicalAdminPermission: true
  },
  emergencyContact: {
    emName: "George Costanza",
    emPhone: 9384930298,
    relationship: "Uncle"
  },
  guardians: [
    {
      firstName: "Granny",
      lastName: "Sinatra",
      relationship: "Granny",
      codeword: "High Horse Away"
    },
    {
      firstName: "Hailey",
      lastName: "Sinatra",
      relationship: "Mother",
      codeword: "Moonlight Serenade"
    }
  ]
});

console.log(s.firstName);
console.log(s.medicalInfo.foodAllergies);
console.log(s.guardians);
