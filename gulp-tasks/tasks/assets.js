/**
 * Date: 20.08.15
 * Time: 11:28
 * @file Optimization of assets like files
 *
 */
'use strict';
/*jshint -W079 */
// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('../common/config')();
var onError = function(err) {
  console.log(err);
};

// Optimize Images
gulp.task('images', false, function() {
  return gulp.src(config.imagesOriginals.src)
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('images'))
    .pipe($.size({title: 'images'}));
});
