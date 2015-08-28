/**
 * Date: 20.08.15
 * Time: 10:30
 * @file Configuration variables for gulp automation
 *
 */

'use strict';

var path = require('path');

var getRepository = function() {
  var repository = 'https://github.com/wunderkraut/nameless';
  try {
    var helper = require('./helper');
    var packageJson = helper.readJsonFile('./package.json');
    var _ = require('lodash');
    if (_.isString(packageJson.repository)) {
      repository = packageJson.repository.replace('.git', '');
    } else {
      repository = packageJson.repository.url.replace('.git', '');
    }
  } catch (err) {
  }
  return repository;
};

var getAppname = function() {
  var appname;
  try {
    var helper = require('./helper');
    var packageJson = helper.readJsonFile('./package.json');
    appname = packageJson.name;
  } catch (err) {
  }
  return appname;
};

module.exports = function() {
  var cwd = '';
  var config = {
    cwd: '',
    maxBuffer: 1024 * 500,
    appname: getAppname(),
    repository: getRepository(),
    versionFiles: ['./package.json', './bower.json'],
    site: {
      url: {
        local: 'myproject.local',
        dev: 'myproject.dev',
        prod: 'myproject.com'
      }
    },
    growly: {
      notify: true,
      successIcon: path.join(cwd, 'gulp-tasks/images/success.png'),
      failedIcon: path.join(cwd, 'gulp-tasks/images/failed.png'),
      errorIcon: path.join(cwd, 'gulp-tasks/images/error.png')
    },
    lint: [
      './scripts/**/*.js',
      'gulpfile.js',
      './gulp-tasks/**/*.js'
    ],
    fonts: {
      src: ['./fonts/*.*'], // you can also add a specific src_appname
      dest: 'fonts'
    },
    images: {
      src: [
        './images/**/*'
      ]
    },
    imagesOriginals: {
      src: [
        './images_originals/**/*'
      ]
    },
    templates: {
      src: [
        'templates/**/*.twig'
      ]
    },
    style: {
      watchFolder: [
        './postcss/**/*.p.css'
      ],
      src: [
        './postcss/**/*.p.css',
        '!./postcss/**/_*.p.css'
      ],
      dest: './css',
      destName: 'main.css'
    },
    script: {
      src: 'js/**/*.js',
      dest: 'js'
    },
    exorcist: {
      dest: 'srcmaps',
      mapExtension: '.map.js'
    },
    bs: {
      files: ['./css/**/*.p.css', './js/**/*.js'],
      logLevel: 'debug',
      browser: 'google chrome canary',
      proxy: 'd8play.local'
    },
    autoPrefixer: [
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 7',
      'opera >= 23',
      'ios >= 7',
      'android >= 4.4',
      'bb >= 10'
    ]
  };

  return config;
};
