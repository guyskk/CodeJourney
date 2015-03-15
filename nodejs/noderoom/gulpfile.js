var gulp = require('gulp');
var sass = require('gulp-sass');
var mainBowerFiles = require('main-bower-files');

var paths = {
    bowerFiles: './bower_components',
    scss: './static/assets/scss/*',
    build: './static/build/',
    lib: './static/lib'
};

gulp.task('sass', function () {
    gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest(paths.build + '/css'));
});

gulp.task('bower', function () {
    gulp.src(mainBowerFiles(), {base: paths.bowerFiles})
        .pipe(gulp.dest(paths.lib));
});

gulp.task('default', function () {
    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.bowerFiles, ['bower'])
});
