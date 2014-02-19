'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		//
		pkg: grunt.file.readJSON('package.json'),
		//
		banner: '' + '/*! \n' + ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.name %> \n' + ' * Authors: Dan Roberts \n' + ' */ \n' + '',
		//
		clean: {
			dist: ['.tmp', 'dist'],
			server: '.tmp'
		},
		//
		compass: {
			options: {
				sassDir: 'assets/css',
				cssDir: '.tmp/assets/css',
				imagesDir: 'assets/img',
				javascriptsDir: 'assets/js',
				fontsDir: 'assets/fonts',
				importPath: 'assets/components',
				relativeAssets: true,
				config: '.config.rb'
			},
			dist: {},
			server: {
				options: {
					debugInfo: true
				}
			}
		},
		//
		connect: {
			options: {
				port: 9000,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, '')];
					}
				}
			},
			dist: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, 'dist')
							];
					}
				}
			}
		},
		//
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'assets',
					dest: 'dist/assets',
					src: ['**/require.js'],
				}]
			}
		},
		//
		cssmin: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				files: {
					'dist/assets/css/main.css': [
					'.tmp/assets/css/main.css']
				}
			}
		},
		//
		htmlmin: {
			dist: {
				options: {},
				files: [{
					expand: true,
					src: '*.html',
					dest: 'dist'
				}]
			}
		},
		//
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'/assets/js{,*/}*.js',
				'!assets/js/vendor/*',
				'test/spec/{,*/}*.js']
		},
		//
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://localhost:<%= connect.options.port %>/index.html']
				}
			}
		},
		//
		open: {
			server: {
				path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
			},
			help: {
				path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/help.html?debug=1'
			}
		},
		//
		requirejs: {
			compile: {
				options: {
					name: '<%= pkg.name %>',
					baseUrl: 'assets/js',
					mainConfigFile: 'assets/js/main.js',
					out: 'dist/assets/js/main.js',
					useStrict: true,
					preserveLicenseComments: false,
					wrap: true,
					optimize: 'none'
				}
			}
		},
		// don't really need this task as requirejs returns this internally
		// TODO: figure out a way to include banner with requirejs task and remove this
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: 'dist/assets/js/main.js',
				dest: 'dist/assets/js/main.js'
			},
		},
		//
		watch: {
			compass: {
				files: ['assets/css/{,*/}*.{scss,sass}'],
				tasks: ['compass']
			},
			livereload: {
				files: [
					'*.html',
					'.tmp/assets/css/*.css',
					'assets/js/{,*/}*.js',
					'assets/img/{,*/}*.{png,jpg,jpeg,webp}'],
				tasks: ['livereload']
			}
		}
	});

	grunt.renameTask('regarde', 'watch');

	grunt.registerTask('listen', [

	]);

	grunt.registerTask('server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'compass:server',
			'livereload-start',
			'connect:livereload',
			'open:server',
			'watch'
		]);
	});

	// grunt.registerTask('test', [
	// 	'clean:server',
	// 	'compass',
	//        'connect:test',
	//        'mocha'
	// ]);

	grunt.registerTask('build', [
		'clean:dist',
		'compass:dist',
		'requirejs',
		//'imagemin',
		'htmlmin',
		'cssmin',
		'uglify',
		'copy'
	]);

	grunt.registerTask('default', [
		'jshint',
		'test',
		'build']);

};