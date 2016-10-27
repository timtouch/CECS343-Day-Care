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
