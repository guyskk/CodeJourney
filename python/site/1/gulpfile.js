var gulp = require('gulp');
var sass = require('gulp-sass');
var mainBowerFiles = require('main-bower-files');


var path = {
    scss: './static/assets/scss/*/.scss',
    js: './static/src/*/.js',
    buildPath: './static/build/'
};

gulp.task('sass', function () {
    gulp.src(path.scss).pipe(sass()).pipe(gulp.dest(path.build + 'css'));
});
gulp.task('bower', function () {
    gulp.src(mainBowerFiles()).pipe(gulp.dest(path.build + '/vender/'));
});

gulp.task('default', function () {
    gulp.run('sass');
    gulp.run('bower');
});