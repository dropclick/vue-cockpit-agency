var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var connectPhp = require('gulp-connect-php/index.js');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();
var cleanDest = require('gulp-clean-dest');
var killProcess = require('kp');
var autoClose = require('browser-sync-close-hook');

// Set the banner content
var banner = ['/*!\n',
  ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n',
  ' */\n',
  ''
].join('');


// Copy all necessary files to dist folder
gulp.task('dist', function () {
  gulp.src([
    'index.html',
    'favicon.*',
    'admin/**/*',
    'vendor/**/*',
    'img/**/*',
    'js/**/*',
    'css/**/*'
  ], { base: '.', dot: true })
    .pipe(cleanDest('dist'))
    .pipe(gulp.dest('./dist'))
});

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function () {

  // Bootstrap
  gulp.src([
    './node_modules/bootstrap/dist/**/*',
    '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
    '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
  ])
    .pipe(gulp.dest('./vendor/bootstrap'))

  // Font Awesome
  gulp.src([
    './node_modules/font-awesome/**/*',
    '!./node_modules/font-awesome/{less,less/*}',
    '!./node_modules/font-awesome/{scss,scss/*}',
    '!./node_modules/font-awesome/.*',
    '!./node_modules/font-awesome/*.{txt,json,md}'
  ])
    .pipe(gulp.dest('./vendor/font-awesome'))

  // Vue
  gulp.src([
    './node_modules/vue/dist/*.js'
  ])
    .pipe(gulp.dest('./vendor/vue'))

  // Vue-Cockpit
  gulp.src([
    './node_modules/vue-cockpit/dist/*.js'
  ])
    .pipe(gulp.dest('./vendor/vue-cockpit'))

  // Fetch API polyfill
  gulp.src([
    './node_modules/whatwg-fetch/*.js'
  ])
    .pipe(gulp.dest('./vendor/whatwg-fetch'))

  // jQuery
  gulp.src([
    './node_modules/jquery/dist/*',
    '!./node_modules/jquery/dist/core.js'
  ])
    .pipe(gulp.dest('./vendor/jquery'))

  // jQuery Easing
  gulp.src([
    './node_modules/jquery.easing/*.js'
  ])
    .pipe(gulp.dest('./vendor/jquery-easing'))

  gulp.src([
    './node_modules/simple-line-icons/css/**',
  ])
    .pipe(gulp.dest('./vendor/simple-line-icons/css'))

});

// Start PHP server
gulp.task('php', function () {
  connectPhp.server();
});

// Start PHP server
gulp.task('stop-php', function () {
  killProcess(8000);
});

// Compile SCSS
gulp.task('css:compile', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function () {
  return gulp.src([
    './css/*.css',
    '!./css/*.min.css'
  ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify']);

// Minify JavaScript
gulp.task('js:minify', function () {
  return gulp.src([
    './js/*.js',
    '!./js/*.min.js'
  ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css', 'js', 'vendor']);

// Build task
gulp.task('build', ['default', 'dist']);

// Configure the browserSync task
gulp.task('browserSync', function () {
  browserSync.use({
    plugin() {},
    hooks: {
      'server:js': autoClose,
    },
  });
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// Dev task
gulp.task('dev', ['css', 'js', 'browserSync', 'php'], function () {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('./*.php', browserSync.reload);
});
