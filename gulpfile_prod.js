/**
 * Date: 29.01.15
 * Time: 13:29
 * @file Main gulp file for automation tasks on the production server
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');

require('gulp-help')(gulp, {
  hideDepsMessage: true
});

// require (sub) tasks
require('./gulp-tasks/tasks/style');

// Because we are including gulp-help the syntax of a gulp task has an extra
// description param at position 2 -
// refer to https://www.npmjs.org/package/gulp-help

// add your top gulp tasks here
gulp.task('default', false, ['styles', 'css-inject']);
