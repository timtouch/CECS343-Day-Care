exports.StudentInfoController = function($scope, $routeParams, $http) {
  var name = $routeParams.name;

  //Make api request with info
  $http.
    get('/api/v1/student/firstName/' + name).
    success(function(data) {
      $scope.student = data.student;
    });

  setTimeout(function() {
    $scope.$emit('StudentInfoController');
  }, 0);
};

exports.NavBarController = function($scope) {

  setTimeout(function() {
    $scope.$emit('NavBarController');
  }, 0);
};

exports.AttendenceSheetController = function($scope, $http) {

  $http.
    get('/api/v1/student').
    success(function(data) {
      $scope.students = data.students;
    });

  setTimeout(function() {
    $scope.$emit('AttendenceSheetController');
  }, 0);

};

exports.StudentsController = function ( $scope, $http ) {

  $http.
    get('/api/v1/student').
    success(function(data) {
      $scope.students = data.students;
    });

  setTimeout(function() {
    $scope.$emit('AttendenceSheetController');
  }, 0);

};
