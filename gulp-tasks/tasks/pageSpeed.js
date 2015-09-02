/**
 * Date: 20.08.15
 * Time: 11:04
 * @file Test site with google page speed analytics
 *
 */
'use strict';
/*jshint -W079 */
var gulp = require('gulp');
var pagespeed = require('psi');
var ngrok = require('ngrok');
var config = require('../common/config')();
var runSequence = require('run-sequence');

// Because we are including gulp-help the syntax of a gulp task has an extra description param at position 2 - refer to https://www.npmjs.org/package/gulp-help
var site = config.site.url.local;
// Helper tasks for pagespeed analysis:
gulp.task('ngrok-url', false, function(cb) {
  return ngrok.connect({

    port: 80,
    'host-header': site
  }, function(err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});

// Run PageSpeed Insights
gulp.task('psi-mobile', false, function(cb) {
  return pagespeed(site, {
    // key: key
    strategy: 'mobile'
  }, function(err, data) {
    console.log('Mobile score: ', data.score);
    console.log('Mobile stats: \n', data.pageStats);
    cb();
  });
});

gulp.task('psi-desktop', false, function(cb) {
  return pagespeed(site, {
    // key: key,
    strategy: 'desktop'
  }, function(err, data) {
    console.log('Desktop score: ', data.score);
    console.log('Desktop stats: \n', data.pageStats);
    cb();
  });
});

// psi task runs and exits
gulp.task('psi-exit', false, function() {
  console.log('Woohoo! Check out your page speed scores!');
  process.exit();
});

// This is the main pagespeed task that will run all helper tasks
gulp.task('pagespeed', 'testing site for pagespeed', function(cb) {
  runSequence('ngrok-url', 'psi-mobile', 'psi-desktop', 'psi-exit', cb);
});
