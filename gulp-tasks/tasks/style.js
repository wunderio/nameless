/**
 * Date: 20.08.15
 * Time: 10:29
 * @file compile css files from sources
 *
 */
'use strict';
/*jshint -W079 */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var cssnext = require('cssnext');
var postcssNested = require('postcss-nested');
var postcssSimpleVars = require('postcss-simple-vars');
var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var config = require('../common/config')();
var map = require('map-stream');
var gutil = $.util;
var chalk = require('chalk');
var notifyGrowly = config.growly.notify;

var onError = function(err) {
  console.log(err);
};

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', false, function() {
  var processors = [
    postcssImport,
    autoprefixer({browsers: config.autoPrefixer}),
    cssnext(),
    postcssNested,
    postcssSimpleVars,
    mqpacker,
    csswring
  ];
  return gulp.src(config.style.src)
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.changed('styles', {extension: '.p.css'}))
    .pipe($.sourcemaps.init())
    .pipe(postcss(processors))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.style.dest))
    .pipe($.size({title: 'styles'}))
    .pipe(map(function() {
      gutil.log(chalk.green('All styles processed'));
      if (notifyGrowly) {
        $.notify('All styles processed');
      }
    }));
});
