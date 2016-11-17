var express = require('express');
var wagner = require('wagner-core');

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

require('./models')(wagner);

var app = express();

app.use(require('morgan')());

app.use('/api/v1', require('./api')(wagner));

// Serve up static HTML pages from the file system.
// For instance, '/6-examples/hello-http.html' in
// the browser will show the '../6-examples/hello-http.html'
// file.
app.use(express.static('./client', { maxAge: 4 * 60 * 60 * 1000 /* 2hrs */ }));

app.listen(port, function(){
  console.log('App is running on http://localhost:' + port);
});
