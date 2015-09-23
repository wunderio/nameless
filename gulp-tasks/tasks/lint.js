/**
 * Date: 20.08.15
 * Time: 11:14
 * @file
 *  Lint JS files with eslint and jscs
 *
 */
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var map = require('map-stream');
var chalk = require('chalk');
var eslint = $.eslint;
var jscs = $.jscs;
var gutil = $.util;
var config = require('../common/config')();
var notify = require('gulp-notify');

var onError = function(err) {
  console.log(err);
};

var EslintErrorHandler = {
  errorHandler: notify.onError(function (error) {
    if (notifyGrowly) {
      return {
        message: 'Error: <%= error.message %>',
        title: '<%= error.name %>',
        icon: config.growly.errorIcon
      };
    }
  })
};

var notifyGrowly = config.growly.notify;

gulp.task('eslint-browser', false, function () {
  return gulp.src(config.lint.node)
    .pipe($.plumber(EslintErrorHandler))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('eslint-node', false, function () {
  return gulp.src(config.lint.node)
    .pipe($.plumber(EslintErrorHandler))
    .pipe(eslint({
      rulePaths: [
        'gulp-tasks'
      ]
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('jscs', false, function() {

  var paths = config.lint.browser.concat(config.lint.node);

  return gulp.src(paths)
    .pipe(jscs())
    .on('error', function(err) {
      gutil.log(err.toString());
      gutil.log(chalk.red('Jscs failed'));
      if (notifyGrowly) {
        $.notify('One or more jscs error(s)');
      }
    })
    .on('error', notify.onError({
      message: "One or more Javascript coding style errors.",
      title: "Javascript Code Style Error",
      icon: config.growly.errorIcon
    }));
});

gulp.task('lint', 'Lint all javascript files.', ['eslint-browser', 'eslint-node', 'jscs']);
