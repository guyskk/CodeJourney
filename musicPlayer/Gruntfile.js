module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'build/scripts/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'build/scripts/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
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
                    paths: ["assets/less"]
                },
                files: {
                    "build/css/<%= pkg.name %>.css": "assets/less/*.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/less"],
                    cleancss: true,
                    modifyVars: {
                        imgPath: '"http://mycdn.com/path/to/images"',
                        bgColor: 'red'
                    }
                },
                files: {
                    "build/css/<%= pkg.name %>.min.css": "assets/less/*.less"
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['jshint', 'uglify', 'concat'],
                options: {
                    debounceDelay: 250,
                }
            },
            css: {
                files: ["assets/**/*.less"],
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


    grunt.registerTask('test', ['jshint', 'watch']);
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'less']);
};
