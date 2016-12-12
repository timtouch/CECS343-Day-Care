var controllers = require('./controllers');
var directives = require('./directives');
var _ = require('underscore');

// Setup app components' dependency injections
var components = angular.module('day-care.components', ['ng']);

// Adds to the conmponents the list of controllers in ./controllers.js
_.each(controllers, function(controller, name) {
  components.controller(name, controller);
});

// Adds to the conmponents the list of directives defined in ./directives.js
_.each(directives, function(directive, name) {
  components.directive(name, directive);
});

// Sets up app dependency injections
var app = angular.module('day-care', ['day-care.components', 'ngRoute', 'ngMaterial', 'ngMessages']);

// Handles the client side page routing
//  templateUrl - file location of template to use
//  controller - Name of controller attached to page
//  access - determines who can access the page
app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '/templates/homepage.html',
      controller: 'HomepageController',
      access: { restricted: false, admin: false }
    }).
    when('/login',{
      templateUrl:'/templates/login.html',
      controller: 'LoginController',
      access: { restricted: false, admin: false }
    }).
    when('/student/:id', {
      templateUrl: '/templates/student_info.html',
      controller: 'StudentInfoController',
      access: { restricted: true, admin: false }
    }).
    when('/attendance_sheet', {
      templateUrl: '/templates/attendance_sheet.html',
      controller: 'AttendanceSheetController',
      access: { restricted: true, admin: false }
    }).
    when('/students', {
      templateUrl: '/templates/students.html',
      controller: 'StudentsController',
      access: { restricted: true, admin: false }
    }).
    when('/pickup_dropoff', {
      templateUrl: '/templates/pickup_dropoff.html',
      controller: 'PickupDropoffController',
      access: { restricted: true, admin: false }
    }).
    when('/new_student', {
      templateUrl: '/templates/new_student.html',
      controller: 'NewStudentController',
      access: { restricted: true, admin: false }
    }).
    when('/edit_student/:id', {
      templateUrl: '/templates/edit_student.html',
      controller: 'EditStudentController',
      access: { restricted: true, admin: false }
    }).
    when('/account_manager', {
      templateUrl: '/templates/account_manager.html',
      controller: 'AccountManagerController',
      access: { restricted: true, admin: true }
    }).
    when('/register_user', {
      templateUrl: '/templates/register_user.html',
      controller: 'RegisterUserController',
      access: { restricted: true, admin: true }
    }).
    when('/user_profile/:username', {
      templateUrl: '/templates/user_profile.html',
      controller: 'UserProfileController',
      access: { restricted: true, admin: true }
    }).
    otherwise({
      redirectTo: '/',
      access: { restricted: false, admin: false }
    });
});

//Checks if user is logged in and redirects to login page if they are not
app.run(function ($rootScope, $location, $route, AuthService) {
  // Activates before changing routes
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      // Calls server to get user login status
      AuthService.getUserStatus()
      .then(function(){
        // If restricted is true, user has to be logged in to access page
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
        // If admin is true, user has to have role of admin to access page
        if (next.access.admin && !AuthService.isAdmin()){
          $location.path('/');
          $route.reload();
        }
      });
  });
});
