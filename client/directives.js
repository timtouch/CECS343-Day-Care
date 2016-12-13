// Custom directives for template pages
exports.homepage = function() {
  return {
    controller: "HomepageController",
    templateUrl: "/templates/homepage.html"
  }
};

// Student info
exports.studentInfo = function() {
  return {
    controller: "StudentInfoController",
    templateUrl: "/templates/student_info.html"
  }
};

// Navigation bar
exports.navBar = function() {
  return {
    controller: "NavBarController",
    templateUrl: "/templates/nav_bar.html"
  }
};

// Attendance sheet
exports.attendanceSheet = function() {
  return {
    controller: "AttendanceSheetController",
    templateUrl: "/templates/attendance_sheet.html"
  }
};

// List of students
exports.students = function() {
  return {
    controller: "StudentsController",
    templateUrl: "/templates/students.html"
  }
};

// Pickup and dropoff interface
exports.pickupDropoff = function() {
  return {
    controller: "PickupDropoffController",
    templateUrl: "/templates/pickup_dropoff.html"
  }
};

// Student creator
exports.newStudent = function() {
  return {
    controller: "NewStudentController",
    templateUrl: "/templates/new_student.html"
  }
};

// Student editor
exports.editStudent = function() {
  return {
    controller: "EditStudentController",
    templateUrl: "/templates/edit_student.html"
  }
};

// Login page
exports.login = function() {
  return {
    controller: "LoginController",
    templateUrl: "/templates/login.html"
  }
};

// Account controller
exports.accountManager = function() {
  return {
    controller: "AccountManagerController",
    templateUrl: "/templates/account_manager.html"
  }
};

// Account creator
exports.registerUser = function() {
  return {
    controller: "RegisterUserController",
    templateUrl: "/templates/register_user.html"
  }
};

// Account viewer
exports.userProfile = function() {
  return {
    controller: "UserProfileController",
    templateUrl: "/templates/user_profile.html"
  }
};
