var path = 'app/static/';
module.exports = function(grunt) {
    grunt.initConfig({
        jshint: { /* jshint的参数 */ },
        concat: { /* concat的参数 */ },
        uglify: { /* uglify的参数 */ },
        watch: { /* watch的参数 */ },
        bower: {
            dev: {
                dest: path + '/vendor/',
                options: {
                    expand: true
                }
            }
        }

    });

    // 从node_modules目录加载模块文件
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower');

    // 每行registerTask定义一个任务
    // grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'bower']);
    // grunt.registerTask('check', ['jshint', 'bower']);
    grunt.registerTask('default', ['bower']);
    grunt.registerTask('check', ['bower']);
};
