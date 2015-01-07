module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['./static/src/**/*.js'],
                dest: './static/build/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    './static/build/js/daily.min.js': './static/src/daily.js'
                }
            }
        },
        jshint: {
            files: ['gruntfile.js', './static/src/**/*.js', 'test/**/*.js'],
            options: {
                //这里是覆盖JSHint默认配置的选项
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        sass: { // Task
            dist: { // Target
                options: { // Target options
                    style: 'expanded'
                },
                files: { // Dictionary of files
                    './static/build/css/base.css': './static/assets/scss/base.scss', // 'destination': 'source'
                    './static/build/css/daily.css': './static/assets/scss/daily.scss' // 'destination': 'source'
                }
            }
        },
        watch: {
            scripts: {
                files: ['./static/src/**/*.js'],
                // tasks: ['jshint', 'uglify', 'concat'],
                tasks: ['jshint'],
                options: {
                    debounceDelay: 250,
                }
            },
            css: {
                files: ["./static/assets/**/*.scss"],
                tasks: ["sass"],
                options: {
                    debounceDelay: 250,
                }
            }
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('test', ['jshint', 'watch']);
    grunt.registerTask('default', ['jshint', 'sass']);

};
