var express = require('express');
var wagner = require('wagner-core');
var passport = require('passport');
var flash = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

require('./models')(wagner);

var app = express();

app.use(require('morgan')());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', require('./api')(wagner));

app.use(session({
  secret: 'shhitsasecret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Serve up static HTML pages from the file system.
// For instance, '/6-examples/hello-http.html' in
// the browser will show the '../6-examples/hello-http.html'
// file.
app.use(express.static('./client', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));

require('./client/routes.js')(app, passport);
app.listen(port, function(){
  console.log('App is running on http://localhost:' + port);
});
