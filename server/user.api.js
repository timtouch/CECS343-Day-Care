var express = require('express');
var passport = require('passport');
var status = require('http-status');

var User = require('./models/user.js');

module.exports = function(wagner){
  var api = express.Router();

    api.post('/register', function(req, res) {
    User.register(new User({ username: req.body.username }),
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
          status: 'Login successful!'
        });
      });
    })(req, res, next);
  });

  api.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
      status: 'Bye!'
    });
  });

  api.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
      return res.status(200).json({
        status: false
      });
    }
    res.status(200).json({
      status: true
    });
  });

  return api;
};
