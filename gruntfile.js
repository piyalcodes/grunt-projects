module.exports = function(grunt) {
	
	grunt.initConfig({
					 
	pgk: grunt.file.readJSON('package.json'),
	uglify : {
		build : {
			src: 'src/js/*.js',
			dest: 'js/script.min.js'
		},
		dev : {
			options : {
				beautify : true,
				mangle : false,
				compress: false,
				preserveComments: 'all'
			},
			src: 'src/js/*.js',
			dest: 'js/script.min.js'
		}
	}, 
	sass : {
		dev : {
			options : {
				outputStyle : 'expanded'
			}, 
			files : {
				'css/style.css'	: 'src/scss/*.scss'
			}
		},
		build : {
			options : {
				outputStyle : 'compressed'
			}, 
			files : {
				'css/style.css'	: 'src/scss/*.scss'
			}
		}
	},
	watch : {  
		js : {
			files : ['src/js/*.js'],
			tasks: ['uglify:dev']
		},
		css :{
			files : ['src/scss/*.scss'],
			tasks: ['sass:dev']
		}
	},
	browserSync: {
        bsFiles: {
            src : ['css/*.css', 'index.html', 'js/*.js']
        },
 		options: {
            watchTask: true,
            debugInfo: true,
            host: "localhost",
            server: {
                baseDir: "./"
            }
        }
    }
	//browser-sync start --server --files "css/*.css", "index.html"
	
	});
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-browser-sync');
 
	
	grunt.registerTask('default', ['uglify:dev', 'sass:dev', 'browserSync', 'watch']);
	grunt.registerTask('build', ['uglify:build', 'sass:build']); 
 
	
};