/**
 * Date: 20.08.15
 * Time: 11:12
 * @file BackstopJs css regression testing
 *
 */
'use strict';
/*jshint -W079 */
// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var onError = function(err) {
  console.log(err);
};

// Because we are including gulp-help the syntax of a gulp task has an extra description param at position 2 - refer to https://www.npmjs.org/package/gulp-help

// Test tasks that need to be run standalone:

gulp.task('bs-reference',
  'create reference files for backstop tests', function() {
  gulp.src('./node_modules/backstopjs/gulpfile.js')
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.chug({
      tasks:  ['reference']
    }));
});

gulp.task('bs-test', 'run backstop test', function() {
  gulp.src('./node_modules/backstopjs/gulpfile.js')
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.chug({
      tasks:  ['test']
    }));
});
