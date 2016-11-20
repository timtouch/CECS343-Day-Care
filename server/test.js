var assert = require('assert');
var express = require('express');
var superagent = require('superagent');
var wagner = require('wagner-core');

var URL_ROOT = 'http://localhost:3000';

describe('Student API', function() {
  var server;
  var Student;

  before(function () {
    var app = express();

    //Bootstrap server
    models = require('./models')(wagner);
    app.use(require('./api')(wagner));

    server = app.listen(3000);
    //Make Student model available in tests
    Student = models.Student;
  });

  after(function(){
    // Shut down server after we're done
    server.close();
  });

  beforeEach(function(done){
    //Make sure students are empty before each test
    Student.remove({}, function(error){
      assert.ifError(error);
      done();
    });
  });

  it('can load a student by firstName', function(done){

    var student = new Student(
      {
        firstName: "John",
        lastName: "Sinatra",
        phone: 1203942345,
        status: "Currently Enrolled",
        medicalInfo: {
          foodAllergies: ["Seafood", "Nuts"],
          medicalAllergies: ["Penicillin", "Cough Drops"],
          medicalAdminPermission: true
        },
        emergencyContact: {
          emFirstName: "George",
          emLastName: "Costanza",
          emPhone: 9384930298,
          relationship: "Uncle"
        },
        guardians: [
          {
            firstName: "Granny",
            lastName: "Sinatra",
            relationship: "Grandma",
            codeword: "High Horse Away"
          },
          {
            firstName: "Hailey",
            lastName: "Sinatra",
            relationship: "Mother",
            codeword: "Moonlight Serenade"
          }
        ]
      }
    );
    //Create a single student
    student.save(function(error, doc){
      assert.ifError(error);
      var url = URL_ROOT + '/student/firstName/John';
      // Make an HTTP requires to localhost:3000/student/firstName/John
      superagent.get(url, function(error, res){
        assert.ifError(error);
        var result;
        // Make sure we got { firstName: 'John'} back
        assert.doesNotThrow(function(){
          result = JSON.parse(res.text);
        });
        assert.ok(result.student);
        assert.equal(result.student.firstName, 'John');
        done();
      });
    });

  });

});
