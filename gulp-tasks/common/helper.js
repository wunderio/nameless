/**
 * Date: 20.08.15
 * Time: 10:32
 * @file Helper functions for gulp automation tasks
 *
 */
/*eslint new-cap:0*/
'use strict';

var fs = require('fs');
var gutil = require('gulp-util');
var stripJsonComments = require('strip-json-comments');
var Q = require('q');
var inquirer = require('inquirer');
var moment = require('moment');
var path = require('path');
var _ = require('lodash');

var readTextFile = function(filename) {
  var body = fs.readFileSync(filename, 'utf8');
  return body;
};

var readJsonFile = function(filename) {
  var body = readTextFile(filename);
  return JSON.parse(stripJsonComments(body));
};

var writeTextFile = function(filename, body) {
  fs.writeFileSync(filename, body);
};

var writeJsonFile = function(filename, json) {
  var body = JSON.stringify(json);
  writeTextFile(filename, body);
};

var filterFiles = function(files, extension) {
  return _.filter(files, function(file) {
    return path.extname(file) === extension;
  });
};

var checkFileAge = function(file) {
  return Q.Promise(function(resolve, reject) {
    var stats = fs.statSync(file.fullPath);
    var age = moment().diff(stats.mtime);

    if (age && age >= 5 * 60 * 1000) {

      gutil.log(gutil.colors.yellow('Warning: the following file ') +
        file.path);
      gutil.log(gutil.colors.yellow('was modified more than ') +
        moment(stats.mtime).fromNow());
      gutil.log(file);
      var questions = [{
        type: 'confirm',
        message: 'Continue deployment anyway?',
        name: 'proceed'
      }];
      inquirer.prompt(questions, function(answers) {
        if (answers.proceed === false) {
          reject(new Error('file is old'));
        }
        resolve(null);
      });

    } else {
      resolve(null);
    }
  });
};

module.exports = {
  readTextFile: readTextFile,
  readJsonFile: readJsonFile,
  writeTextFile: writeTextFile,
  writeJsonFile: writeJsonFile,
  filterFiles: filterFiles,
  checkFileAge: checkFileAge
};
