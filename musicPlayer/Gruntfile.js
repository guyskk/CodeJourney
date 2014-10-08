module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['static/src/**/*.js'],
                dest: 'static/build/scripts/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'static/build/scripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
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
        less: {
            development: {
                options: {
                    paths: ["static/assets/less"]
                },
                files: {
                    "static/build/css/<%= pkg.name %>.css": "static/assets/less/*.less"
                }
            },
            production: {
                options: {
                    paths: ["static/assets/less"],
                    cleancss: true,
                    modifyVars: {
                        imgPath: '"http://mycdn.com/path/to/images"',
                        bgColor: 'red'
                    }
                },
                files: {
                    "static/build/css/<%= pkg.name %>.min.css": "static/assets/less/*.less"
                }
            }
        },
        watch: {
            scripts: {
                files: ['static/src/**/*.js'],
                tasks: ['jshint', 'uglify', 'concat'],
                options: {
                    debounceDelay: 250,
                }
            },
            css: {
                files: ["static/assets/**/*.less"],
                tasks: ["less"],
                options: {
                    debounceDelay: 250,
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-');

    grunt.registerTask('test', ['jshint', 'watch']);
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less']);

};
