module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'build/js/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'build/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
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
                    style: 'expanded',
                    unixNewlines: true
                },
                files: {
                    'build/css/ele.me.<%= pkg.version %>.css': 'scss/ele.me.scss'
                }
            }
        },
        watch: {
            // scripts: {
            //     files: ['src/**/*.js'],
            //     tasks: ['jshint', 'uglify', 'concat'],
            //     options: {
            //         debounceDelay: 0,
            //     }
            // },
            css: {
                files: ["scss/ele.me.scss"],
                tasks: ["sass"],
                options: {
                    debounceDelay: 0,
                }
            }
        }
    });

    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // grunt.registerTask('test', ['jshint', 'watch']);
    // grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'sass']);
    
    grunt.registerTask('default', ['sass']);

};
