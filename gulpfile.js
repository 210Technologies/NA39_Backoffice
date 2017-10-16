var gulp          = require('gulp');
var notify        = require('gulp-notify');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var merge         = require('merge-stream');
var cleanCSS      = require('gulp-clean-css');
var sourcemaps    = require('gulp-sourcemaps');
var image         = require('gulp-image');
var concatCss     = require('gulp-concat-css');
var concat        = require('gulp-concat');
var gulpNgConfig = require('gulp-ng-config');
var env = process.env.NODE_ENV || 'local'

if (ENV === 'local') {
  require('dotenv').load();
}


// var fonts         = require('gulp-font')


// Where our files are located
var jsFiles   = "src/js/**/*.js";
var viewFiles = "src/js/**/*.html";

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

gulp.task('fonts', function() {
    return gulp.src(['./src/assets/fonts/*'])
            .pipe(gulp.dest('./build/styles'));
});

gulp.task('scripts', function() {
  return gulp.src('./src/assets/js/*.js')
             .pipe(uglify())
             .pipe(gulp.dest('./build/js/'));
});


gulp.task('image', function () {
  gulp.src('./src/assets/images/*')
    .pipe(gulp.dest('./build/styles'));
});

gulp.task('minify-css', function () {
  return gulp.src('./src/assets/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./build/styles'));
});
gulp.task('configuration', function(){
  return gulp.src('configApp.json')
  .pipe(gulpNgConfig('app.EnvironmentConfig', {
    environment: 'env.' + env,
    wrap: true
  }))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./src/js/config'));
})
gulp.task('browserify', ['views'], function() {
  
  return browserify('./src/js/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./build/'));
});

gulp.task('html', function() {
  return gulp.src("src/index.html")
      .on('error', interceptErrors)
      .pipe(gulp.dest('./build/'));
});

gulp.task('views', function() {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./src/js/config/'));
});



// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'browserify', 'minify-css', 'image', 'scripts', 'fonts'], function() {
  var html = gulp.src("build/index.html")
                 .pipe(gulp.dest('./dist/'));

  var js = gulp.src("build/main.js")
               .pipe(uglify())
               .pipe(gulp.dest('./dist/'));

  return merge(html,js);
});

gulp.task('default', ['html', 'browserify','configuration', 'minify-css', 'image', 'scripts', 'fonts'], function() {
  
  // browserSync.init(['./build/**/**.**'], {
  //   server: "./build",
  //   port: process.env.PORT || 5000,
  //   notify: false,
  //   open: false,
  //   ui: {
  //     port: 4001
  //   }
  // });
  
  // gulp.watch("src/index.html", ['html']);
  // gulp.watch(viewFiles, ['views']);
  // gulp.watch(jsFiles, ['browserify']);
});
