module.exports = function(grunt){
	grunt.initConfig({
		watch:{
			options:{
				livereload:true
			},
			express:{
				files: ['**/*.html', '**/*.js'],
				tasks: ['express:dev'],
				options: {
					spawn: false,
				}
			}
		},
		express:{
			dev:{
				options:{
					script:'index.js'
				}
			}
		}
	})
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-express-server");
	grunt.registerTask("default", ['express:dev', 'watch'])

}