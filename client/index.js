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
    when('/student/:name', {
      templateUrl: '/templates/student_info.html',
      controller: 'StudentInfoController'
    }).
    when('/student', {
      templateUrl: '/templates/attendence_sheet.html',
      controller: 'AttendenceSheetController'
    });
});
