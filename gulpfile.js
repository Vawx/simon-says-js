var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var source      = require('vinyl-source-stream');
var utilities   = require('gulp-util');
var browserify  = require('browserify');

var buildProduction = utilities.env.production;

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

gulp.task("minifyScripts", ["jsBrowserify"], function() {
  return gulp.src("./build/js/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("./build/js"));
});

gump.task.build("build", function() {
  if(buildProduction)
  {
    gulp.start('minifyScripts');
  }
  else
  }
    gulp.start('jsBrowserify');
  }
});
