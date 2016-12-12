var gulp = require('gulp');
var mocha = require('mocha');

// Using gulp watch to automate testing
gulp.task('test', function(){
  var error = false;
  gulp.
  src('./test.js').
  pipe(mocha()).
  //if tests fail
  on('error', function() {
    console.log('Tests failed!');
    error = true;
  }).
  //if tests pass
  on('end', function() {
    if(!error) {
      console.log('Tests succeeded!');
      process.exit(0);
    }
  });
});

//Tests when changes to student.api.js are made
gulp.task('watch', function() {
  gulp.watch(['./student.api.js'], ['test']);
});
