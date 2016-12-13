//=====================================================================================
// CONTROLLERS FOR EACH PAGE
//=====================================================================================

exports.HomepageController = function ($scope) {

  // Used when testing the directives
  setTimeout(function() {
    $scope.$emit('HomepageController');
  }, 0);
};

exports.StudentInfoController = function($scope, $routeParams, $http, $mdDialog, $location) {
  var id = $routeParams.id;

  //Get info of selected student
  $http.
    get('/api/v1/student/' + id).
    success(function(data) {
      $scope.student = data.student;
  });
  // Displays modal pop up to confirm deletion of student
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
  // Used to determine which tab should be active
  $scope.currentURL = $location.url();
  // Used to determine which tabs are shown and to whom
  $scope.isLoggedIn = AuthService.isLoggedIn(); // If true, shows tabs that users are allowed to see
  $scope.isAdmin = AuthService.isAdmin(); // If true, shows tabs admins are allowed to see
  $scope.logout = function() {
    //call logout from service to log user out
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
  // Gets current date
  var utc = new Date().toJSON().slice(0,10);
  // A list for the date dropdown
  $scope.attendanceDates = [];
  $scope.selectedDate = utc;
  $scope.saved = false;
  $scope.error = false;
  $scope.unrecordedDay =  false; // A flag that indicates if this is an unrecorded day
  $scope.enumAttendance = ['Present', 'Absent', 'Tardy']; // Options for a dropdown

  $scope.attendance = {
    attendanceDate: utc,
    students: []
  }
  //If the attendance exists in the DB, show it, otherwise initialize/populate a new attendance sheet
  $http.
    get('/api/v1/attendance/date/' + utc).
    success(function(data) {
      $scope.attendance = data.attendance;
      $scope.unrecordedDay = false;
    }).
    error(setupNewAttendance); // The error indicates that the day has never been saved so setup for the new day
  // Get a list of all recorded attendance dates
  $http.
    get('/api/v1/attendance/all').
    success( function(data){
      // Fill the dates dropdown with all attendance dates recorded
      $scope.attendanceDates = data.attendanceDates.map(
        function(currDate, index, dateArray){
          return currDate.attendanceDate.slice(0,10);
        });
      // If the current day was not recorded yet, add it to the dropdown
      if ($scope.unrecordedDay){
        $scope.attendanceDates.push($scope.selectedDate);
      }
      $scope.attendanceDates.sort(descendingCompare);
    }).
    error(setErrorMessage);

  // POST if date was unrecorded previously, PUT to update otherwise
  $scope.saveAttendance = function(){
    if ($scope.unrecordedDay) {
      $http.
        post('/api/v1/attendance', $scope.attendance).
        success(function(data){
          $scope.message = "Saved Successfully";
          $scope.saved = true; //Feedback to user of success
          $scope.unrecordedDay = false;
        }).
        error(setErrorMessage);
    } else {
      $http.
        put('/api/v1/attendance', $scope.attendance).
        success(function(data) {
          $scope.message = "Updated Successfully";
          $scope.saved = true; //Feedback to user of success
        }).
        error(setErrorMessage);
    }
  };
  //Get the attendance information for the selected date
  $scope.getAttendance = function(){
    $http.
      get('/api/v1/attendance/date/' + $scope.selectedDate).
      success(function(data){
        $scope.attendance = data.attendance;
        $scope.unrecordedDay = false;
      }).
      error(setupNewAttendance);
      $scope.saved = false;
      $scope.error = false;
  };
  // Function that initializes an unrecorded date with students
  function setupNewAttendance(){
    $scope.attendance = {
      attendanceDate: utc,
      students: []
    }
    $scope.unrecordedDay = true;
    $scope.attendance.attendanceDate = utc;
    $http.
      get('/api/v1/student').
      success( function(data) {
        // Formats the information associated with each student
        $scope.attendance.students = data.students.map(
          function (currStudent, index, studentArray){
            return {
              firstName: currStudent.firstName,
              lastName: currStudent.lastName,
              attendance: 'Absent',
              notes: ''
            };
        });
      }).
      error(setErrorMessage);
  };
  // Displays an error to the user if something went wrong
  function setErrorMessage(data) {
    $scope.saved = false;
    $scope.error = true;
    $scope.errorMessage =  "Oops, something happened on our side";
  };

  // Sort descending order in array, utility function
  function descendingCompare( a, b ){
    if(a > b){
      // a before b
      return -1;
    } else if (a < b) {
      // a after b
      return 1;
    }
    //Otherwise a == b
    return 0;
  };

  setTimeout(function() {
    $scope.$emit('AttendanceSheetController');
  }, 0);

};

exports.StudentsController = function ( $scope, $http, $location ) {
  // Get all students from DB
  $http.
    get('/api/v1/student').
    success(function(data) {
      // Format student info to be displayed
      $scope.students = data.students.map(function(currStudent, index, array){
        return {
          _id: currStudent._id,
          firstName: currStudent.firstName,
          lastName: currStudent.lastName,
          medicalInfo: currStudent.medicalInfo,
          emergencyContact: currStudent.emergencyContact
        }
      });
    });
  // Redirect to a selected student's profile page
  $scope.setSelected = function(studentID){
    $location.path('/student/' + studentID);
  };

  setTimeout(function() {
    $scope.$emit('StudentsController');
  }, 0);
};

exports.PickupDropoffController = function($scope, $http) {
  // Get all students from DB
  $http.
    get('/api/v1/student').
    success(function(data) {
      // Maps only the needed student information in the array of students
      $scope.students = data.students.map(function(currStudent, index, array){
        return {
          _id: currStudent._id,
          firstName: currStudent.firstName,
          lastName: currStudent.lastName,
          guardians: currStudent.guardians
        }
      });
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
  // Used in filter function to remove empty array elements
  var isNotEmptyField = function(value){
    return value != "";
  };
  // Used to add or remove textboxes for food allergies and medical allergies field
  $scope.addOption = function(option) {
    option.push('');
  };
  $scope.removeOption = function(option){
    if(option.length > 1){
      option.pop();
    }
  };

  //Adds student to database
  $scope.addStudent = function() {
    // Setting values from textboxes to the student object we are going to submit
    $scope.student.firstName = $scope.firstName;
    $scope.student.lastName = $scope.lastName;
    $scope.student.phone = parseInt($scope.phoneNumber);
    $scope.student.status = "Currently Enrolled";
    $scope.student.medicalInfo.foodAllergies = $scope.foodAllergies.filter(isNotEmptyField);
    $scope.student.medicalInfo.medicalAllergies = $scope.medicalAllergies.filter(isNotEmptyField);
    $scope.student.medicalInfo.medicalNeeds = $scope.medicalNeeds;
    $scope.student.medicalInfo.medicalAdminPermission = $scope.medicalAdminPermission;
    $scope.student.emergencyContact.emFirstName = $scope.emFirstName;
    $scope.student.emergencyContact.emLastName = $scope.emLastName;
    $scope.student.emergencyContact.emPhone = parseInt($scope.emPhone);
    $scope.student.emergencyContact.relationship = $scope.emRelationship;
    $scope.student.guardians = $scope.guardians;

    // Save the new student information and redirect user to students page
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
  // Used in filter function to remove empty array elements
  var isNotEmptyField = function(value){
    return value != "";
  };
  // Get a specific user's information
  $http.
    get('/api/v1/student/' + studentid).
    success(function(data){
      $scope.student = data.student;
      // used to make sure there are still input textboxes even if array is empty
      if($scope.student.medicalInfo.foodAllergies.length < 1){
        $scope.student.medicalInfo.foodAllergies.push("");
      }
      if($scope.student.medicalInfo.medicalAllergies.length < 1){
        $scope.student.medicalInfo.medicalAllergies.push("");
      }
  });

  $scope.updateStudent = function() {
    // Filter out the empty fields
    $scope.student.medicalInfo.foodAllergies.filter(isNotEmptyField);
    $scope.student.medicalInfo.medicalAllergies.filter(isNotEmptyField);

    // Update the student information to DB
    $http.
      put('/api/v1/student', $scope.student).
      success(function(student){
        console.log("Successfully edited" + student);
    });
    $location.url('/students');
  };

  // Used to add or remove textboxes for food allergies and medical allergies field
  $scope.addOption = function(option) {
    option.push('');
  };
  $scope.removeOption = function(option){
    if(option.length > 1){
      option.pop();
    }
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
      //handle success, redirects to home page
      .then(function() {
        $location.path('/');
        $scope.disabled = false;
        $scope.loginForm = {};
      })
      //handle error, displays error to user
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
  // Get list all users and their info
  $http.get('/user/users').
    success(function(data) {
      $scope.users = data.users;
  });
  // Takes admin to page that registers users
  $scope.addUser = function(){
    $location.path('/register_user');
  };
  // Directs admin to user profile page
  $scope.setSelected = function(username){
    $location.path('/user_profile/' + username);
  };

  setTimeout(function() {
    $scope.$emit('AccountManagerController');
  }, 0);
};

exports.RegisterUserController = function($scope, $location, AuthService, $http) {
  // Sets dropdown options
  $scope.roles = ['user', 'admin'];
  $scope.chosenRole = 'user'; // initial dropdown option
  // Registers the user
  $scope.register = function () {
    // Fill in newUser object with values from input form
    $scope.newUser = {
      username: $scope.registerForm.username,
      password: $scope.registerForm.password,
      role: $scope.chosenRole,
      firstName: $scope.registerForm.firstName,
      lastName: $scope.registerForm.lastName
    }
    // initial values
    $scope.error = false; // true when error occurs
    $scope.disabled = true; // prevents users from clicking submit button
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
  // Uses the route parameter value to determine which user to query for
  var username = $routeParams.username;
  $scope.roles = ['user', 'admin'];
  $scope.user = {};
  $scope.showEditForm = false; // Hides the edit user form
  // Gets the user information
  $http.get('/user/' +  username).
    success(function(data){
      $scope.user = data.user;
      $scope.chosenRole = $scope.user.role;
  });

  // Modal pop up to confirm delete of user
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
          });
        $location.url('/account_manager');
      }, function() {});
  };

  $scope.editUser = function() {
    $scope.showEditForm = true;
  };
  // Updates the editted user info to the DB
  $scope.updateUser = function(){
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
