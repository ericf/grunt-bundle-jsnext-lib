/*
 * grunt-bundle-jsnext-lib
 * https://github.com/caridy/grunt-bundle-jsnext-lib
 *
 * Copyright (c) 2014 Caridy Patino
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'lib/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    mkdir: {
      all: {
        options: {
          create: ['tmp']
        },
      },
    },

    // Configuration to be run (and then tested).
    bundle_jsnext: {
      default_options: {
        dest: 'tmp/default_options.js'
      },
      custom_options: {
        options: {
          namespace: 'foobarbaz',
          namedExport: 'foo',
          main: 'test/fixtures/other.js',
        },
        dest: 'tmp/custom_options.js'
      }
    },

    // Configuration to be run (and then tested).
    system_jsnext: {
      default_options: {
        dest: 'tmp/system_default/'
      },
      custom_options: {
        options: {
          main: 'test/fixtures/other.js',
        },
        dest: 'tmp/system_custom/'
      }
    },

    // Configuration to be run (and then tested).
    cjs_jsnext: {
      default_options: {
        dest: 'tmp/cjs_default/'
      },
      custom_options: {
        options: {
          main: 'test/fixtures/other.js',
        },
        dest: 'tmp/cjs_custom/'
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'mkdir', 'bundle_jsnext', 'cjs_jsnext', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
