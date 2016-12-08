var gulp = require('gulp');
var mocha = require('mocha');

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

gulp.task('watch', function() {
  gulp.watch(['./student.js'], ['test']);
});
