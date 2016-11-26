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

//Handles the client side routing
app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/templates/homepage.html',
      controller: 'HomepageController',
      access: { restricted: false }
    }).
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
    }).
    when('/account_manager', {
      templateUrl: '/templates/account_manager.html',
      controller: 'AccountManagerController',
      access: { restricted: false, admin: true } //<<NOTE: Set to false for testing purposes
    }).
    when('/register_user', {
      templateUrl: '/templates/register_user.html',
      controller: 'RegisterUserController',
      access: { restricted: false } //<<NOTE: Set to false for testing purposes
    }).
    otherwise({
      redirectTo: '/',
      access: { restricted: false }
    });
});

//Checks if user is logged in and redirects to login page if they are not
app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
        if (next.access.admin && !AuthService.isAdmin()){
          $location.path('/');
          $route.reload();
        }
      });
  });
});
