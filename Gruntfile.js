
'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.loadNpmTasks('grunt-notify');

  grunt.loadNpmTasks('grunt-phantomcss');

  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['js/**/*.js'],
        tasks: ['newer:jshint:all']
      },
      compass: {
        files: ['scss/**/*.{scss,sass}'],
        tasks: ['compass:localDevOnlyStyle', 'notify:compassStyle', 'compass:localDevAllFiles', 'notify:compassAll'],
        options: {
          interrupt: true,
          livereload: true
        }
      },
      imagesOriginalsImg: {
        files: [
          'images_originals/**/*.{png,jpg,jpeg,gif,svg}'
        ],
        tasks: ['newer:imagemin', 'notify:imagemin'],
        options: {
          event: ['added', 'changed']
        }
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
          './js/**/*.js'
        ]
      }
    },

    scsslint: {
      options: {
        bundleExec: true,
        config: '.scss-lint.yml',
        colorizeOutput: true
      },
      all: [
        'sass/**/*.scss'
      ]
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: './images_originals',
          src: '{,*/}*.{png,jpg,jpeg,gif,svg}',
          dest: './images'
        }]
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: 'scss',
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
        require: ['compass/import-once/activate', 'singularitygs', 'breakpoint', 'modular-scale'],
        bundleExec: true,
        sourcemap: true,
        noLineComments: true,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      dist: {
        options: {
          environment: 'production',
          outputStyle: 'compressed'
        }
      },
      localDevOnlyStyle: {
        options: {
          environment: 'development',
          specify: 'scss/style.scss'
        }
      },
      localDevAllFiles: {
        options: {
          environment: 'development'
        }
      }
    },
    phantomas: {
      gruntSite : {
        options : {
          indexPath : './phantomas/',
          options   : {},
          url       : 'http://project-url.dev/',
          buildUi   : true
        }
      }
    },
    notify: {
      compassStyle: {
        options: {
          title: 'style.css compiled',
          message: 'Compass generated the style.css file.'
        }
      },
      compassAll: {
        options: {
          title: 'Compilation done',
          message: 'Compass generated all remaining css files.'
        }
      },
      imagemin: {
        options: {
          title: 'Images minified',
          message: 'Imagemin successfully minified all new images.'
        }
      }
    },
    phantomcss: {
      options: {
        baseURL: 'http://project-url.dev',
        screenshots: 'test/references/all/',
        results: 'test/results/'
      },
      src: [
        'test/**/*.js'
      ]
    }
  });

  grunt.registerTask('test', 'Test page for css & design regressions', function() {
    if (grunt.option('type')) {
      grunt.config.set('phantomcss.src', ['test/' + grunt.option('type') + '.js']);
      grunt.config.set('phantomcss.options.screenshots', 'test/references/type_' + grunt.option('type') + '/');
    }

    grunt.task.run(['phantomcss']);
  });

  grunt.registerTask('dist', [
    'jshint:all',
    'compass:dist'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'compass:localDevOnlyStyle',
    'compass:localDevAllFiles',
    'newer:imagemin',
    'watch'
  ]);
};
