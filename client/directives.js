exports.homepage = function() {
  return {
    controller: "HomepageController",
    templateUrl: "/templates/homepage.html"
  }
};

exports.studentInfo = function() {
  return {
    controller: "StudentInfoController",
    templateUrl: "/templates/student_info.html"
  }
};

exports.navBar = function() {
  return {
    controller: "NavBarController",
    templateUrl: "/templates/nav_bar.html"
  }
};

exports.attendenceSheet = function() {
  return {
    controller: "AttendenceSheetController",
    templateUrl: "/templates/attendence_sheet.html"
  }
};

exports.students = function() {
  return {
    controller: "StudentsController",
    templateUrl: "/templates/students.html"
  }
};

exports.pickupDropoff = function() {
  return {
    controller: "PickupDropoffController",
    templateUrl: "/templates/pickup_dropoff.html"
  }
};

exports.newStudent = function() {
  return {
    controller: "NewStudentController",
    templateUrl: "/templates/new_student.html"
  }
};

exports.editStudent = function() {
  return {
    controller: "EditStudentController",
    templateUrl: "/templates/edit_student.html"
  }
};

exports.login = function() {
  return {
    controller: "LoginController",
    templateUrl: "/templates/login.html"
  }
};

exports.accountManager = function() {
  return {
    controller: "AccountManagerController",
    templateUrl: "/templates/account_manager.html"
  }
};

exports.registerUser = function() {
  return {
    controller: "RegisterUserController",
    templateUrl: "/templates/register_user.html"
  }
};
