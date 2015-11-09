'use strict'

var gulp = require('gulp')
var exec = require('child_process').exec
var sourcemaps = require('gulp-sourcemaps')
var postcss = require('gulp-postcss')
var size = require('gulp-filesize')
var smoosher = require('gulp-smoosher')
var preprocess = require('gulp-preprocess')
var minimist = require('minimist')

var allowedOptions = {
  string: 'build',
  default: { build: 'pages' }
}

var options = minimist(process.argv.slice(2), allowedOptions)

function run(command) {
  var child = exec(command)
  child.stdout.pipe(process.stdout)
  child.stderr.pipe(process.stderr)
  process.on('exit', function(code) {
    if (child.exit) { child.exit(code) }
  })
  child.on('exit', function(code) {
    process.exit(code)
  })
}

function generateHTML() {
  var buildPath = options.build === 'chrome' ? 'ext' : '.'

  if (buildPath === 'chrome') {
    console.log('Building chrome extension')
  }

  return gulp.src('assets/index.html')
    .pipe(preprocess({ context: { build: options.build } }))
    .pipe(smoosher())
    .pipe(gulp.dest(buildPath))
}

gulp.task('build', ['build-chrome', 'build-pages', 'css'], generateHTML)

gulp.task('build-chrome', function(done) {
  exec('npm run build-js', function(err, stdout, stderr) {
    if (err) { return done(err) }
    done()
  })
})

gulp.task('build-pages', function(done) {
  exec('npm run build-pages', function(err, stdout, stderr) {
    if (err) { return done(err) }
    done()
  })
})

gulp.task('css', function() {
  return gulp.src('assets/css/main.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('autoprefixer'),
      require('postcss-import')({
        from: 'assets/css/main.css'
      }),
      require('postcss-custom-properties'),
      require('postcss-color-function'),
      require('cssnano')
    ]))
    .pipe(size())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'))
})

gulp.task('html', ['css'], generateHTML)

gulp.task('release', ['build'], function(done) {
  if (options.build !== 'chrome') {
    return done(new Error('Not packing chrome extension. Run again with --build chrome'))
  }
  exec('find ext -name .DS_Store -delete && zip -r dist/chrome.zip ext', function(err, stdout) {
    console.log(stdout)
    done()
  })
})

gulp.task('watch', function() {
  run('npm run watch-pages')
  run('npm run watch-js')
  gulp.watch(['assets/css/**/*.css', 'assets/index.html'], ['html'])
})

gulp.task('default', ['css', 'watch'])
