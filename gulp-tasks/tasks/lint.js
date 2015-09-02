/**
 * Date: 20.08.15
 * Time: 11:14
 * @file
 *  Lint JS files with jshint and jscs
 *
 */
'use strict';
/*jshint -W079 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var map = require('map-stream');
var chalk = require('chalk');
var jshint = $.jshint;
var jscs = $.jscs;
var gutil = $.util;
var config = require('../common/config')();

var onError = function(err) {
  console.log(err);
};

var notifyGrowly = config.growly.notify;

gulp.task('jshint', false, function() {
  var hasError = false;
  var hasShown = false;
  var successReporter = map(function(file, cb) {
    if (!file.jshint.success) {
      hasError = true;
    }
    cb(null, file);
  });

  return gulp.src(config.lint)
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe(jshint({
      lookup: true
    }))
    .pipe(successReporter)
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', function() {
      gutil.log(chalk.red('Jshint failed'));
      if (notifyGrowly) {
        $.notify('One or more jshint error(s)');
      }
      throw new Error('jshint failed');
    })
    .pipe(map(function() {
      if (!hasError && !hasShown) {
        hasShown = true;
        gutil.log(chalk.green('All Jshint files passed'));
        if (notifyGrowly) {
          $.notify('JsHint - All files passed');
        }
      }

    }));
});

gulp.task('jscs', false, function() {

  return gulp.src(config.lint)
    .pipe(jscs())
    .on('error', function(err) {
      gutil.log(err.toString());
      gutil.log(chalk.red('Jscs failed'));
      if (notifyGrowly) {
        $.notify('One or more jscs error(s)');
      }
    });
});

gulp.task('lint', 'Lint all javascript files.', ['jshint', 'jscs']);
