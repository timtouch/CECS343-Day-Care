angular.module('day-care').factory('AuthService',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    // create user variable
    var user = null;
    var role = null;

    // return available functions for use in the controllers
    return ({
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });

    //checks if user is logged in
    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    //verifies if user is an admin 
    function isAdmin(){
      if(role === 'admin') {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/user/status')
      // handle success
      .success(function (data) {
        if(data.status){
          user = true;
          role = data.role;
        } else {
          user = false;
          role = null;
        }
      })
      // handle error
      .error(function (data) {
        user = false;
      });
    }

    //logs in user with the given credentials
    function login(username, password) {
      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/login',
        {username: username, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            role = data.role;
            deferred.resolve();
          } else {
            user = false;
            role = null;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          role = null;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    //logs user out of the system
    function logout() {
      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/user/logout')
        // handle success
        .success(function (data) {
          user = false;
          role = null;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          role = null;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    //registers a new user
    function register(username, password, role, firstName, lastName) {
      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/user/register',
        {username: username, password: password, role: role, firstName: firstName, lastName: lastName})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          deferred.reject(data.err);
        });
      // return promise object
      return deferred.promise;
    }

}]);
