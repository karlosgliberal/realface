var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var config = require('../config.js');

gulp.task('icons', function() {
  return gulp.src(config.svgIcon.src)
    .pipe(svgSprite(config.svgIcon))
    .pipe(gulp.dest('.'));
});

gulp.task('icons:watch', function() {
  gulp.watch(config.svgIcon.src, ['icons'], reload);
});
