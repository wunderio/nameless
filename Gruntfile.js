
'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['js/{,*/}*.js'],
        tasks: ['newer:jshint:all']
      },
      compass: {
        files: ['sass/{,*/}*.{scss,sass}'],
        tasks: ['compass:localdev'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      imagesOriginalsImg: {
        files: [
          'images_originals/{,*/}*.{png,jpg,jpeg,gif}'
        ],
        tasks: ['newer:imagemin']
      },
      imagesOriginalsSvg: {
        files: ['images_originals/{,*/}*.svg'],
        tasks: ['newer:svgmin']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          './js/{,*/}*.js'
        ]
      }
    },

    scsslint: {
      allFiles: [
        'sass/{,*/}*.scss'
      ],
      options: {
        bundleExec: true,
        config: '.scss-lint.yml',
        colorizeOutput: true
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: './images_originals',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: './images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: './images_originals',
          src: '{,*/}*.svg',
          dest: './images'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: 'sass',
        cssDir: 'css',
        generatedImagesDir: 'images',
        imagesDir: 'images',
        javascriptsDir: 'js',
        fontsDir: 'fonts',
        importPath: ['libraries/normalize-scss', 'libraries/formalize/assets/css'],
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images',
        httpFontsPath: '/fonts',
        relativeAssets: true,
        assetCacheBuster: false,
        require: ['singularitygs', 'breakpoint', 'modular-scale'],
        bundleExec: true,
        sourcemap: true,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          environment: 'production',
          noLineComments: true,
          outputStyle: 'compressed'
        }
      },
      localdev: {
        options: {
          environment: 'development',
          //debugInfo: true,
          noLineComments: false
        }
      }
    },
    phantomas: {
      gruntSite : {
        options : {
          indexPath : './phantomas/',
          options   : {},
          url       : 'http://abas.dev/',
          buildUi   : true
        }
      }
    }
  });

  grunt.registerTask('dist', [
    'jshint:all',
    'compass:dist'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'watch'
  ]);
};
