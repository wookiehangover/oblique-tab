var gulp = require('gulp');
var exec = require('child_process').exec;
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');


gulp.task('css', function() {
  return gulp.src('assets/css/main.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('postcss-import')({
        from: 'assets/css/main.css'
      }),
      require('autoprefixer'),
      require('postcss-custom-properties'),
      require('postcss-color-function'),
      require('cssnano')
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('ext/css'));
})

gulp.task('watch', function() {
  var watchify = exec('npm run watch-pages');
  process.on('exit', function(code) {
    watchify.kill(code);
  });

  watchify.stdout.pipe(process.stdout);
  watchify.stderr.pipe(process.stderr);

  // gulp.watch('assets/less/**/*.less', ['less']);
  gulp.watch('assets/css/**/*.css', ['css']);
});

gulp.task('default', ['less', 'watch']);
