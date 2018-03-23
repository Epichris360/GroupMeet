// including plugins
var gulp = require('gulp')
var minifyCSS = require('gulp-clean-css')
var autoprefixer = require('gulp-autoprefixer')
var gp_concat = require('gulp-concat')
var gp_rename = require('gulp-rename')
var gp_uglify = require('gulp-uglify')
// var less = require('gulp-less')
var to5 = require('gulp-6to5')
var path = require('path')

gulp.task('css', function(){
    return gulp.src(
            [
                './public/css/core.min.css',
                './public/css/thesaas.min.css',
                './public/css/style.css',
                './public/css/jquery.timepicker.min.css'
            ]
        )
        .pipe(minifyCSS())
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
})

gulp.task('copy-fonts', function(){
    return gulp.src(
            ['./public/fonts/**']
        )
        .pipe(gulp.dest('./public/dist/fonts/'))
})

gulp.task('imgs', function(){
    return gulp.src(
            ['./public/img/**']
        )
        .pipe(gulp.dest('./public/dist/img/'))
})

gulp.task('style', ['css', 'copy-fonts'], function(){})


gulp.task('js', function(){
    return gulp.src(
            [   
                './public/js/core.min.js',
                './public/js/thesaas.min.js',
                './public/js/script.js',
                './public/js/dropzone.js',
                './public/js/app.js',
                './public/js/jquery.timepicker.min.js'
            ]
        )
        .pipe(gp_concat('vendor.min.js'))
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/js/'))
});

gulp.task('es6-es5', ['js'], function(){
    return gulp.src([
                './src/*/**.js',
                './src/*/*/**.js'
            ]
        )
        .pipe(to5())
        .pipe(gulp.dest('./public/dist/es5/'))
});

gulp.task('watch', function() {
    gulp.watch(['./src/*/**.js', './src/*/*/**.js', './public/js/**.js'], ['es6-es5'])
})

gulp.task('prod', ['style', 'es6-es5'], function(){})

gulp.task('default', ['es6-es5', 'watch'], function(){})
