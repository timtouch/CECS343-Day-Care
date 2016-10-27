exports.StudentInfoController = function($scope, $routeParams, $http) {
  var name = $routeParams.name;

  console.log("NAME: " + name);
  console.log($routeParams);

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
