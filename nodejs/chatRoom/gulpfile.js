var gulp = require('gulp');
var sass = require('gulp-sass');
var mainBowerFiles = require('main-bower-files');

var paths = {
    bowerFiles: './bower_components',
    scss: './public/assets/scss/**/*.scss',
    build: './public/build/'
};

gulp.task('sass', function () {
    gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest(paths.build + '/css'));
});

gulp.task('bower', function(){
    gulp.src(mainBowerFiles(), {base: paths.bowerFiles})
        .pipe(gulp.dest('./public/build/vendor'));
});

gulp.task('default', function(){
   gulp.watch('public/assets/scss/**/*.scss', ['sass']);
    gulp.watch(paths.bowerFiles, ['bower'])
});
