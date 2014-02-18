// Generated on 2013-12-06 using generator-angular 0.6.0
'use strict';
var path = require('path'),
    globalConfig = require('./server/config');

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  // require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  // require('time-grunt')(grunt);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.loadNpmTasks('grunt-ng-constant')
  
  var yeomanConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };
  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: yeomanConfig,

    ngconstant: {
      options: {
        space: '  '
      },
      dev: {
        dest: '<%= yeoman.app %>/scripts/config.js',
        wrap: '"use strict";\n\n <%= __ngModule %>',
        name: 'config',
        constants: {
          socketEndpoint: 'http://localhost:3000/'
        }
      },
      prod: {
        dest: '<%= yeoman.app %>/scripts/config.js',
        wrap: '"use strict";\n\n <%= __ngModule %>',
        name: 'config',
        constants: {
          socketEndpoint: 'http://wolof-v3.herokuapp.com/'
        }
      }
    },
    
    express: {
      options: {
        // Override node env's PORT
        port: globalConfig["development"].PORT,
        // Override the command used to start the server.
        // (e.g. 'coffee' instead of the default 'node' to enable CoffeeScript support)
        cmd: process.argv[0],
        // Will turn into: `node path/to/server.js ARG1 ARG2 ... ARGN`
        args: [ ],
        // Setting to `false` will effectively just run `node path/to/server.js`
        background: true,
        // Called when the spawned server throws errors
        fallback: function() {},
        // Override node env's NODE_ENV
        node_env: undefined,
        // Consider the server to be "running" after an explicit delay (in milliseconds)
        // (e.g. when server has no initial output)
        delay: 0,
        // Regular expression that matches server output to indicate it is "running"
        output: '.+',
        // Set --debug
        debug: false
      },
      dev: {
        options: {
          server: path.resolve('./server/server.js'),
          node_env: 'development',
          port: globalConfig["development"].PORT
        }
      },
      prod: {
        options: {
          server: path.resolve('./server/server.js'),
          node_env: 'production',
          port: globalConfig["production"].PORT
        }
      },
      test: {
        options: {
          server: path.resolve('./server/server.js'),
          node_env: 'testing',
          port: globalConfig["testing"].PORT
        }
      }
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js'],
        tasks: ['newer'],
        options: {
          livereload: true
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        //tasks: ['newer:jshint:test', 'karma']
        tasks: ['newer', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
       express: {
                files: [
                    '<%= yeoman.app %>/{,*//*}*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*//*}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*//*}*.js',
                    '<%= yeoman.app %>/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}',
                    'server.js',
                    'server/{,*//*}*.{js,json}',
                    'server/models/{,*//*}*.{js,json}'
                ],
                tasks: ['express:dev'],
                options: {
                    livereload: true,
                    spawn: false,
                }
            }
    },

    open: {
        server: {
            path: 'http://localhost:<%= express.options.port %>'
        }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          // Optional configurations that you can uncomment to use
          // removeCommentsFromCDATA: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'images/{,*/}*.{webp,jpg,png}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'express:dist:keepalive']);
    }
    
    grunt.task.run([
      'clean:server',
      'ngconstant:dev',
      'concurrent:server',
      'express:dev',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'ngconstant:dev',
    'concurrent:test',
    'autoprefixer',
    'express:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'ngconstant:prod',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'newer',
    'test',
    'build'
  ]);
};
