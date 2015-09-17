/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: 
      '/* <%= pkg.title || pkg.name %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> */\n',
    // Task configuration.
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: [
          {src: 'src/common/*.js', dest: '<%= pkg.outDir %>/_scripts/common.min.js'},
          {src: 'src/resume/*.js', dest: '<%= pkg.outDir %>/_scripts/resume.min.js'}
        ]
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          $: false
        }
      },
      gruntfile: {
        src: '<%= pkg.gruntfile %>'
      },
      files: {
        src: ['src/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= pkg.gruntfile %>',
        tasks: ['jshint:gruntfile']
      },
      jsHint: {
        files: '<%= jshint.files.src %>',
        tasks: ['jshint:files']
      },
      copy: {
        files: ['**/*.html', '!_site/**/*'],
        tasks: ['copy:site']
      },
      less: {
        files: ['_styles/**/*.less'],
        tasks: ['less:build']
      }
    },
    copy: {
      site: {
        files: [
          {expand: true, src: ['_styles/**/*.css'], dest: '<%= pkg.outDir %>'},
          {expand: true, src: ['**/*.html', '!node_modules/**/*'], dest: '<%= pkg.outDir %>'}
        ]
      }
    },
    less: {
      build: {
        options: {
          paths: ["assets/css"]
        },
        files: [
          {expand: true, src: ['_styles/**/*.less'], dest: '<%= pkg.outDir %>', ext: ".css"}
        ]
      }
    },
    clean: ['_site/'],
    cleanempty: {
      options: {},
      src: ["_site/**/*"]
    }
  });

  // These plugins provide necessary tasks.
  //grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-cleanempty');

  // Default task.
  grunt.registerTask('default', ['clean', 'jshint', 'less', 'uglify', 'copy', 'cleanempty']);
};
