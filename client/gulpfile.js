/*
 * This file is used to automate tasks using gulp
 */

var gulp = require('gulp');
var browserify = require('gulp-browserify');

// Browserify lets you require('modules') in the browser by bundling up all of your dependencies.
// In this case, we bundle into the client/bin/index.js file
gulp.task('browserify', function() {
  return gulp.
    src('./index.js').
    pipe(browserify()).
    pipe(gulp.dest('./bin'));
});

gulp.task('watch', function() {
  gulp.watch(['./*.js'], ['browserify']);
});
