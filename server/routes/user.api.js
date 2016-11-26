var express = require('express');
var passport = require('passport');
var status = require('http-status');

var User = require('../models/user.js');

module.exports = function(wagner){
  var api = express.Router();

  //======================================================================
  // HANDLES USER API CALLS
  //======================================================================
  //Register a new user, error if username already exists
  api.post('/register', function(req, res) {
    User.register(new User({ username: req.body.username, role: req.body.role,
        firstName: req.body.firstName, lastName: req.body.lastName }),
      req.body.password, function(err, account) {
      if (err) {
        return res.status(500).json({
          err: err
        });
      }
      passport.authenticate('local')(req, res, function () {
        return res.status(200).json({
          status: 'Registration successful!'
        });
      });
    });
  });

  //Login a user, error if incorrect login info
  api.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          err: info
        });
      }
      req.logIn(user, function(err) {
        if (err) {
          return res.status(500).json({
            err: 'Could not log in user'
          });
        }
        res.status(200).json({
          status: 'Login successful!',
          role: user.role
        });
      });
    })(req, res, next);
  });

  //Logout user
  api.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
      status: 'Bye!'
    });
  });

  //Check if user is properly logged in
  api.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
      return res.status(200).json({
        status: false,
        role: null
      });
    }
    res.status(200).json({
      status: true,
      role: req.user.role
    });
  });

  //Retrieve list of users
  //Should only be for admins
  api.get('/users', function(req, res) {
    User.find({}, { _id: 0, password: 0 }, function(err, users){
      if(err) {
        return res.
          status(status.INTERNAL_SERVER_ERROR).
          json({ error: err.toString() });
      }
      if (!users) {
        return res.
          status(status.NOT_FOUND).
          json({ error: error.toString() });
      }
      res.json( { users: users });
    });
  });
  //Get information of certain user
  api.get('/:username', function(req, res) {
    User.find({username: req.params.username}, function(err, user){
      if(err){
        return res.
          status(status.INTERNAL_SERVER_ERROR).
          json({ error: err.toString() });
      }
      if(!user){
        return res.
          status(status.NOT_FOUND).
          json({ error: 'Not found' });
      }
      res.json({ user: user });
    });
  });
  //Delete a user
  api.delete('/:username', function(req, res) {
    User.remove( { username: req.params.username }, function(err) {
      if(err) {
        return next(err)
      }
      else {
        res.send("Successfully deleted user");
      }
    });
  });
  //Change password of user
  api.put('/:username', function(req, res, next) {
    User.findByUsername(req.params.username).then(function(user){
      if(user){
        user.setPassword(req.body.password, function(err, user){
          if(err){
            return next(err);
          }
          user.save();
          res.
            status(200).
            json({message: 'Password Reset Successful'});
        });
      } else {
        res.
          status(status.INTERNAL_SERVER_ERROR).
          json({message: 'This user does not exist'});
      }
    },function(err){
      return next(err);
    });
  });

  return api;
};
