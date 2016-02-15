var gulp        = require('gulp');
var concat      = require('gulp-concat');
var source      = require('vinyl-source-stream');
var browserify  = require('browserify');

gulp.task('simonSays', function() {
  console.log("simon says");
});

gulp.task('concatInterface', function() {
  return gulp.src(['./js/browser.js'])
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'], function() {
  return browserify({ entries: ['./tmp/allConcat.js']})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js'));
});
