/**
 * Date: 29.01.15
 * Time: 13:29
 * @file Main gulp file for automation tasks
 *
 */

'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var browsersync = require('browser-sync').create();
var reload = browsersync.reload;

require('gulp-help')(gulp, {
  hideDepsMessage: true
});

var config = require('./gulp-tasks/common/config.js')();

// require (sub) tasks
require('require-dir')('./gulp-tasks/tasks');

// Because we are including gulp-help the syntax of a gulp task has an extra
// description param at position 2 -
// refer to https://www.npmjs.org/package/gulp-help

// add your top gulp tasks here
gulp.task('default', false, ['styles-dev', 'css-inject', 'lint', 'images']);

gulp.task('browser-sync', false, function() {
  browsersync.init(config.bs);
});

gulp.task('watch',
  'watch files for changes and reload browser',
  function() {
  gulp.watch([config.style.watchFolder], ['styles-dev', 'css-inject']);
  gulp.watch([config.script.src], ['jshint']);
  gulp.watch([config.images.src, config.templates.src]);
});
