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

var app = angular.module('day-care', ['day-care.components', 'ngRoute', 'ngMaterial']);

app.config(function($routeProvider) {
  $routeProvider.
    when('/login',{
      templateUrl:'/templates/login.html',
      controller: 'LoginController',
      access: { restricted: false }
    }).
    when('/student/:id', {
      templateUrl: '/templates/student_info.html',
      controller: 'StudentInfoController',
      access: { restricted: true }
    }).
    when('/attendence_sheet', {
      templateUrl: '/templates/attendence_sheet.html',
      controller: 'AttendenceSheetController',
      access: { restricted: true }
    }).
    when('/students', {
      templateUrl: '/templates/students.html',
      controller: 'StudentsController',
      access: { restricted: true }
    }).
    when('/pickup_dropoff', {
      templateUrl: '/templates/pickup_dropoff.html',
      controller: 'PickupDropoffController',
      access: { restricted: true }
    }).
    when('/new_student', {
      templateUrl: '/templates/new_student.html',
      controller: 'NewStudentController',
      access: { restricted: true }
    }).
    when('/edit_student/:id', {
        templateUrl: '/templates/edit_student.html',
        controller: 'EditStudentController',
        access: { restricted: true }
    });/*.
    otherwise({
      redirectTo: '/'
    });
    */
});

app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});
