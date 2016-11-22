var controllers = require('./controllers');
var directives = require('./directives');
var _ = require('underscore');

var components = angular.module('day-care.components', ['ng']);

_.each(controllers, function(controller, name) {
  components.controller(name, controller);
});

_.each(directives, function(directive, name) {
  components.directive(name, directive);
});

var app = angular.module('day-care', ['day-care.components', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.
    when('/student/:id', {
      templateUrl: '/templates/student_info.html',
      controller: 'StudentInfoController'
    }).
    when('/attendence_sheet', {
      templateUrl: '/templates/attendence_sheet.html',
      controller: 'AttendenceSheetController'
    }).
    when('/students', {
      templateUrl: '/templates/students.html',
      controller: 'StudentsController'
    }).
    when('/pickup_dropoff', {
      templateUrl: '/templates/pickup_dropoff.html',
      controller: 'PickupDropoffController'
    }).
    when('/new_student', {
      templateUrl: '/templates/new_student.html',
      controller: 'NewStudentController'
    }).
    when('/edit_student/:id', {
        templateUrl: '/templates/edit_student.html',
        controller: 'EditStudentController'
    });
});
