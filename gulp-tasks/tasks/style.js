/**
 * Date: 20.08.15
 * Time: 10:29
 * @file compile css files from sources
 *
 */
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');
var postcss = require('gulp-postcss');
var postcssImport = require('postcss-import');
var postcssMixins = require('postcss-mixins');
var postcssNested = require('postcss-nested');
var postcssAdvancedVars = require('postcss-advanced-variables');
var postcssColorFunction = require('postcss-color-function');
var postcssExtend = require('postcss-extend');
var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var config = require('../common/config')();
var map = require('map-stream');
var gutil = $.util;
var chalk = require('chalk');
var notifyGrowly = config.growly.notify;
var errorNotyShown = false;

var onError = function(err) {
  console.log(err);
};

var processors = [
  postcssImport,
  postcssMixins({
    mixinsDir: path.join(__dirname, 'postcss-mixins')
  }),
  autoprefixer({browsers: config.autoPrefixer}),
  postcssAdvancedVars,
  postcssColorFunction,
  postcssNested,
  postcssExtend
];

var StylesDevErrorHandler = {
  errorHandler: $.notify.onError(function (error) {
    var message = error.message
      .replace(/^\/[^ ]+\//, '')
      .replace(/\^/, '')
      .replace(/\s/, ' ')
      .trim();

    if (notifyGrowly) {
      errorNotyShown = true;
      return {
        message: message,
        title: 'postCSS error',
        icon: config.growly.errorIcon
      };
    }
  })
};

gulp.task('css-inject', function () {
  var target = gulp.src('./fbs.libraries.yml');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  var sources = gulp.src(['./css/components/*.p.css', '!./css/components/node__*.p.css'], {read: false});

  return target.pipe($.inject(sources, {
    starttag: '# css-components:{{ext}} #',
    endtag: '# endinject #',
    transform: function(filepath, file, index, length, targetFile) {
      var path = filepath.substring(1);
      return path + ': {}'
    }
  }, {name: 'css-components'}))
    .pipe(gulp.dest('./'));
});

// Compile and Automatically Prefix Stylesheets fior production
gulp.task('styles', false, function() {
  var prodProcessors = processors.concat([
    mqpacker,
    csswring
  ]);
  return gulp.src(config.style.src)
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.sourcemaps.init())
    .pipe(postcss(prodProcessors))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.style.dest))
    .pipe($.size({title: 'styles'}));
});

// Compile and Automatically Prefix Stylesheets for dev
gulp.task('styles-dev', false, function() {

  errorNotyShown = false;

  return gulp.src(config.style.src)
    .pipe($.plumber(StylesDevErrorHandler))
    .pipe($.sourcemaps.init())
    .pipe(postcss(processors))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.style.dest))
    .pipe($.size({title: 'styles'}))
    .pipe($.notify(function () {
      if (!errorNotyShown) {
        return {
          message: 'All styles processed',
          onLast: true
        }
      }
    }));
});
