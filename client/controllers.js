exports.StudentInfoController = function($scope, $routeParams, $http, $mdDialog, $location) {
  var id = $routeParams.id;

  //Make api request with info
  $http.
    get('/api/v1/student/' + id).
    success(function(data) {
      $scope.student = data.student;
  });
  $scope.showConfirm = function(ev) {
    var confirm = $mdDialog.confirm()
      .title('Do you want to DELETE this student?')
      .textContent('This will permanently delete the student')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('Yes please!')
      .cancel('No thanks!');

      //Deletes student if confirmed, otherwise do nothing
      $mdDialog.show(confirm).then(function() {
        $http.
          delete('/api/v1/student/' + id).
          success(function(data) {
            console.log(data);
          });
        $location.url('/students');
      }, function() {});
  };

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

exports.PickupDropoffController = function($scope, $http) {

  $http.
    get('/api/v1/student').
    success(function(data) {
      $scope.students = data.students;
    });

  setTimeout(function() {
    $scope.$emit('PickupDropoffController');
  }, 0);

};

exports.NewStudentController = function($scope, $http, $location) {
  //Initialize models for saving input
  $scope.student = {
    medicalInfo: {},
    emergencyContact:{},
    guardians: []
  };


  $scope.guardians = [{},{}];
  $scope.foodAllergies = [''];
  $scope.medicalAllergies = [''];

  $scope.addOption = function(option) {
    option.push('');
  }

  $scope.removeOption = function(option){
    option.pop();
  }

  //Adds student to database
  $scope.addStudent = function() {

    $scope.student.firstName = $scope.firstName;
    $scope.student.lastName = $scope.lastName;
    $scope.student.phone = parseInt($scope.phoneNumber);
    $scope.student.status = "Currently Enrolled";
    $scope.student.medicalInfo.foodAllergies = $scope.foodAllergies;
    $scope.student.medicalInfo.medicalAllergies = $scope.medicalAllergies;
    $scope.student.medicalInfo.medicalNeeds = $scope.medicalNeeds;
    $scope.student.medicalInfo.medicalAdminPermission = $scope.medicalAdminPermission;
    $scope.student.emergencyContact.emFirstName = $scope.emFirstName;
    $scope.student.emergencyContact.emLastName = $scope.emLastName;
    $scope.student.emergencyContact.emPhone = parseInt($scope.emPhone);
    $scope.student.emergencyContact.relationship = $scope.emRelationship;
    $scope.student.guardians = $scope.guardians;

    $http.
      post('/api/v1/student', $scope.student).
      success(function(addedStudent){
        console.log("Successfully added" + addedStudent);
      });
      $location.url('/students');
    };

  setTimeout(function() {
    $scope.$emit('NewStudentController');
  }, 0);

};

exports.EditStudentController = function($scope, $routeParams, $http, $location){
  var studentid = $routeParams.id;
  $http.
    get('/api/v1/student/' + studentid).
    success(function(data){
      $scope.student = data.student;
  });

  $scope.addOption = function(option) {
    option.push('');
  };

  $scope.removeOption = function(option){
    option.pop();
  };

  $scope.updateStudent = function() {
    $http.
    put('/api/v1/student', $scope.student).
    success(function(student){
      console.log("Successfully edited" + student);
    });

    $location.url('/students');
  };

  setTimeout(function() {
    $scope.$emit('EditStudentController');
  }, 0);
};
