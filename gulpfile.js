'use strict'

const fs = require('fs')
const gulp = require('gulp')
const exec = require('child_process').exec
const sourcemaps = require('gulp-sourcemaps')
const postcss = require('gulp-postcss')
const size = require('gulp-filesize')
const smoosher = require('gulp-smoosher')
const preprocess = require('gulp-preprocess')
const minimist = require('minimist')
const manifest = require('./ext/manifest.json')
const pkg = require('./package.json')

const allowedOptions = [{
  string: ['build', 'version']
}]

const options = Object.assign({
  build: 'pages',
  version: 'patch'
}, minimist(process.argv.slice(2), allowedOptions))

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

function generateHTML(build) {
  const buildPath = build === 'chrome' ? 'ext' : '.'
  return gulp.src('assets/index.html')
    .pipe(preprocess({ context: { build: build } }))
    .pipe(smoosher())
    .pipe(gulp.dest(buildPath))
}

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

gulp.task('version', function updateVersion(done) {
  const version = manifest.version.split('.')
  let major = version[0]
  let minor = version[1]
  let patch = version[2]

  switch (options.version) {
    case 'major':
      major = parseInt(major, 10) + 1 || 1
      minor = 0
      patch = 0
      break
    case 'minor':
      minor = parseInt(minor, 10) + 1 || 0
      patch = 0
      break
    case 'patch':
    default:
      patch = parseInt(patch, 10) + 1 || 0
      break
  }

  manifest.version = [major, minor, patch].join('.')
  pkg.version = manifest.version

  fs.writeFile('ext/manifest.json', JSON.stringify(manifest, null, 2), function(err) {
    if (err) throw err
    fs.writeFile('package.json', JSON.stringify(pkg, null, 2), function(err) {
      if (err) throw err
      console.log(`Wrote ${options.version} version to manifest.json and package.json`)
      done()
    })
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

gulp.task('release', ['pages', 'chrome', 'version'], function(done) {
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

gulp.task('html', ['css'], function() {
  return generateHTML(options.build)
})

gulp.task('chrome', ['build-chrome', 'css'], function() {
  return generateHTML('chrome')
})

gulp.task('pages', ['build-pages', 'html'])

gulp.task('default', ['css', 'watch'])
