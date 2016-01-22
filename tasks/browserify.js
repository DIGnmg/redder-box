'use strict';


module.exports = function browserify(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-reactify');
	grunt.loadNpmTasks('grunt-reactify');

	// Options
	return {
		build: {
			files: {
				'.build/js/app.js': ['public/js/app.js']
			},
			options: {
				transform: [
					["babelify", {
                    	loose: "all"
                  	}]
                  ]
			}
		}
	};
};