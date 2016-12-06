exports.HomepageController = function ($scope) {

  setTimeout(function() {
    $scope.$emit('HomepageController');
  }, 0);
}
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

exports.NavBarController = function($scope, $location, AuthService) {
  $scope.currentURL = $location.url();
  $scope.isLoggedIn = AuthService.isLoggedIn();
  $scope.isAdmin = AuthService.isAdmin();
  $scope.logout = function() {
    //call logout from service
    AuthService.logout()
    .then(function(){
      $location.path('/login');
    });
  };

  setTimeout(function() {
    $scope.$emit('NavBarController');
  }, 0);
};

exports.AttendanceSheetController = function($scope, $http) {

  $http.
    get('/api/v1/student').
    success(function(data) {
      $scope.students = data.students;
    });

  setTimeout(function() {
    $scope.$emit('AttendanceSheetController');
  }, 0);

};

exports.StudentsController = function ( $scope, $http, $location ) {

  $http.
    get('/api/v1/student').
    success(function(data) {
      $scope.students = data.students;
    });

  $scope.setSelected = function(studentID){
    $location.path('/student/' + studentID);
  };

  setTimeout(function() {
    $scope.$emit('StudentsController');
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
    $scope.$emit('AddStudentController');
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

exports.LoginController = function($scope, $location, AuthService) {

  $scope.login = function() {

    //initial values
    $scope.error = false;
    $scope.disabled = true;
    //call login from service
    AuthService.login($scope.loginForm.username, $scope.loginForm.password)
      //handle success
      .then(function() {
        $location.path('/');
        $scope.disabled = false;
        $scope.loginForm = {};
      })
      //handle error
      .catch(function() {
        $scope.error = true;
        $scope.errorMessage = "Invalid username and/or password";
        $scope.disabled = false;
        $scope.loginForm = {};
      });
  };

  setTimeout(function() {
    $scope.$emit('LoginController');
  }, 0);
};

exports.AccountManagerController = function($scope, $http, $location, AuthService) {

  $http.get('/user/users').
    success(function(data) {
      $scope.users = data.users;
  });

  $scope.addUser = function(){
    $location.path('/register_user');
  };

  $scope.setSelected = function(username){
    $location.path('/user_profile/' + username);
  };

  setTimeout(function() {
    $scope.$emit('AccountManagerController');
  }, 0);
};

exports.RegisterUserController = function($scope, $location, AuthService) {

  $scope.roles = ['user', 'admin'];
  $scope.chosenRole = 'user';
  $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password,
          $scope.chosenRole, $scope.registerForm.firstName, $scope.registerForm.lastName)
        // handle success
        .then(function () {
          $location.path('/account_manager');
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        // handle error
        .catch(function (err) {
          $scope.error = true;
          $scope.errorMessage = err.message || "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

  setTimeout(function() {
    $scope.$emit('RegisterUserController');
  }, 0);
};

exports.UserProfileController = function($scope, $http, $routeParams, $mdDialog, $location){
  var username = $routeParams.username;
  $scope.roles = ['user', 'admin'];
  $scope.user = {};
  $scope.showEditForm = false;

  $http.get('/user/' +  username).
    success(function(data){
      $scope.user = data.user;
      $scope.chosenRole = $scope.user.role;
  });


  $scope.showConfirm = function(ev) {
    var confirm = $mdDialog.confirm()
      .title('Do you want to DELETE this user?')
      .textContent('This will permanently delete the user')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('Yes please!')
      .cancel('No thanks!');

      //Deletes student if confirmed, otherwise do nothing
      $mdDialog.show(confirm).then(function() {
        $http.
          delete('/user/' +  username).
          success(function(data) {
            console.log(data);
          });
        $location.url('/account_manager');
      }, function() {});
  };

  $scope.editUser = function() {
    $scope.showEditForm = true;
  };

  $scope.updateUser = function(){
    console.log($scope.user);
    $scope.user.role = $scope.chosenRole;
    $http.
      put('/user/edit_user/' + username, $scope.user).
      success(function(data){
        console.log(data);
    });
    $scope.showEditForm = false;
  };
  setTimeout(function() {
    $scope.$emit('UserProfileController');
  }, 0);
};
