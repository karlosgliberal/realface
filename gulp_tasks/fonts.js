var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var config = require('../config.js');

gulp.task('fonts', function() {
  return gulp.src(config.fonts.src)
      .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('fonts:watch', function() {
  gulp.watch(config.fonts.src, ['fonts'], reload);
});
