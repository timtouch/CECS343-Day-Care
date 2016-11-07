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
