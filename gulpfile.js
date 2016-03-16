'use strict';

var gulp = require('gulp');
var gulpConfig = require('./gulpconfig');
var path = require('path');

// Gulp tasks
require('gulp-task-browsersync')(gulp, gulpConfig);
require('gulp-task-css-inject')(gulp, gulpConfig);
require('gulp-task-postcss')(gulp, gulpConfig);
require('gulp-task-stylelint')(gulp, gulpConfig);
require('gulp-task-lint-browser')(gulp, gulpConfig);
require('gulp-task-svg-stack')(gulp, gulpConfig);
require('gulp-task-backstop-test')(gulp, gulpConfig);

gulp.task('default', [
  'build',
  'watch'
]);

gulp.task('build', [
  'postcss',
  'svg-stack',
  'lint-browser',
  'stylelint',
  'css-inject'
]);

gulp.task('watch', [
  'postcss-watch',
  'css-inject-watch',
  'lint-browser-watch',
  'svg-stack-watch'
]);
