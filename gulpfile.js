var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
/*var rename = require('gulp-rename');*/
var notify = require('gulp-notify');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

gulp.task('script', function(){
	// tarea script
    return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.js').pipe(gulp.dest('./src/js'))
});

gulp.task('script_jquery',function(){
    return gulp.src('./node_modules/jquery/dist/jquery.js').pipe(gulp.dest('./src/js'));
});

gulp.task('style', function() {
	// tarea style
    return gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css').pipe(gulp.dest('./src/css'));
});
gulp.task('font', function() {
	// tarea style
    return gulp.src('./node_modules/font-awesome/css/font-awesome.css').pipe(gulp.dest('./src/css'));
});
gulp.task('fonts', function() {
	// tarea style
    return gulp.src('./node_modules/font-awesome/fonts/*').pipe(gulp.dest('./src/fonts/'));
});
gulp.task('alert_css', function() {
	// tarea style
    return gulp.src('./node_modules/sweetalert/dist/sweetalert.css').pipe(gulp.dest('./src/css/'));
});
gulp.task('alert_js', function() {
	// tarea style
    return gulp.src('./node_modules/sweetalert/dist/sweetalert-dev.js').pipe(gulp.dest('./src/js/'));
});
/*
gulp.task('images', function() {
	// tarea images
});
*/


gulp.task('default', ['style', 'script','script_jquery','font','fonts','alert_css','alert_js']);