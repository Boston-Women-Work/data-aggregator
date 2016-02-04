var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var Server = require('karma').Server;
var jshint = require('gulp-jshint');
var connect = require('gulp-connect');
var inject = require('gulp-inject');

// *******************************************

gulp.task('buildApp', function(){
  return gulp.src([
      '!app/scripts/options.example.js',
      'app/scripts/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('buildVendor', function(){
  return gulp.src([
      '!bower_components/angular-bootstrap/ui-bootstrap.min.js',
      'bower_components/angular/angular.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/**/*.min.js'])
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('buildCSS', function(){
  return gulp.src([
      'bower_components/bootstrap-css-only/css/bootstrap.css',
      'app/styles/**/*.css'])
    .pipe(concat('styles.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('moveHTML', function(){
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('injectHTML', ['buildApp', 'buildVendor', 'buildCSS', 'moveHTML'], function () {
  return gulp.src('./dist/index.html')
    .pipe(inject(gulp.src([
        './dist/vendors.js',
        './dist/app.js',
        './dist/styles.css'],
      {read: false}),
      {relative: true}))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('build', ['buildApp', 'buildVendor', 'buildCSS', 'moveHTML', 'injectHTML']);

// **********************************

gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: false
  }, done).start();
});

gulp.task('jshint', function(){
  return gulp.src(['app/scripts/**/*.js', 'test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', ['karma', 'jshint']);

// ***************************************

gulp.task('connect', function(){
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('watch', function(){
  gulp.watch('app/scripts/**/*.js', ['buildApp']);
  gulp.watch('app/styles/**/*.css', ['buildCSS']);
  gulp.watch('app/**/*.html', ['moveHTML']);
});

// *******************************************

gulp.task('default', ['build', 'test', 'watch', 'connect']);
