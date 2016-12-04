module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Coding guidelines.
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			target: {
				src: ['app/js/*.js', 'app/js/components/*.js']
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [
                    'app/js/libs/*.js', 
                    'app/js/components/*.js', 
                    'app/js/main.js'
                ],
				dest: 'dist/js/app.js',
			}
		},
		uglify: {
			options: {
				mangle: true,
				compres: true,
				sourceMap: 'dist/js/main.min.map'
			},
			target: {
				src: 'dist/js/main.js',
				dest: 'dist/js/main.min.js'
			}
		},
		less: {
			dev: {
				options: {
					compress: true						
				},
				files: {
					'app/css/main.css': [
						'app/less/main.less'
					],
					'app/css/bootstrap.min.css': [
						'app/less/libs/bootstrap/bootstrap.less'
					],
					'app/css/font-awesome.css': [
						'app/less/libs/font-awesome.less'
					],
					'app/css/flag-icon.css': [
						'app/less/libs/flag-icon.less'
					]
				}
			}
		},
		sass: { 
			dist: { 
//				options: { 
//					style: 'expanded'	//nested, compact, compressed, expanded
//				},
				files: { 
					'app/css/main.css': [
						'app/less/main.scss'
					]
				}
			}
		},
		watch: {
			less: {
				files: ['app/less/**/*.less'],
				tasks: ['less']
			},
			sass: {
				files: ['app/sass/**/*.scss'],
				tasks: ['sass']
			},
			scripts: {
				files: ['app/js/**/*.js'],
				tasks: ['concat']
			}
		},
        copy: {
        	// template_setup: {
        		// src: 'net/assets/pageTemplate/setup/*',
        		// dest: 'net/public/pageTemplate/setup/',
        		// flatten: true,
        		// filter: 'isFile',
        		// expand: true
        	// },
        	css: {
        		src: 'app/css/*.css',
        		dest: 'dist/css/'
        	},
        	fonts: {
        		src: 'app/css/fonts/*.*',
        		dest: 'dist/css/fonts'
        	}
        },
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('production', ['jshint', 'copy', 'uglify']);
	grunt.registerTask('default', ['jshint', 'watch:less']);

};
