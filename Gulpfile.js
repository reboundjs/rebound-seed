'use strict';

var gulp = require('gulp');
var del = require('del');
var server = require('gulp-express');
var sass = require('gulp-sass');
var rebound = require('gulp-rebound');

gulp.task('clean', function(cb){
  // Clean our dist
  del(['dist/stylesheets', 'dist/templates', 'dist/tmp'], cb)
});

gulp.task('sass', ['clean'], function () {
  return gulp.src('apps/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/apps'));
});

gulp.task('rebound', ['clean'], function(){
  return gulp.src(["apps/**/*.html"])
  .pipe(rebound())
  .pipe(gulp.dest('dist/apps'));
});

gulp.task('default', ['rebound', 'sass'], function () {

    // Start the server at the beginning of the task
    server.run(['app.js']);

    gulp.watch(['index.html'], [server.notify]);
    gulp.watch(['apps/**/*.scss'], ['sass', server.notify]);
    gulp.watch(['apps/**/*.html'], ['rebound', server.notify]);

    // Restart the server when file changes
    gulp.watch(['app.js', 'api/**/*.js'], [server.run]);
});
