var express = require('express');
var wagner = require('wagner-core');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

require('./models/models')(wagner);


// user schema/model
var User = require('./models/user.js');
//create instance of express
var app = express();

//Define middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//api routes
app.use('/api/v1', require('./api')(wagner));

app.use(session({
  secret: 'shhitsasecret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..client', 'index.html'));
});

// Serve up static HTML pages from the file system.
app.use(express.static('./client', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));

// error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

app.listen(port, function(){
  console.log('App is running on http://localhost:' + port);
});
