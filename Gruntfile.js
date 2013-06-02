module.exports = function(grunt) {

	var proc = require('child_process');

	// grunt.loadNpmTasks('grunt-contrib-cssmin');
	// grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({

		compass: {
			dist: {
				options: {
				}
			}
		},

		growl: {
			// for windows
			notify: 'growlnotify /t:"Compass -watch" "Compiled!\\nｷﾀ━ヽ(*´Д｀*)ﾉ━ｯ!!!!"'
		},

		watch: {
			files: [
				'src/*.scss'
			],
			tasks: ['compass', 'growl']
		}

	});

	grunt.registerMultiTask('growl', 'growl notify', function() {
		proc.exec(this.data);
	});

	grunt.registerTask('default', ['compass', 'watch', 'growl']);

};
