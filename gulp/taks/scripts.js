const { src, dest, watch, series, parallel } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const notify = require('gulp-notify');

const browserify = require('browserify');
const babelify = require('babelify'); // eslint-disable-line no-unused-vars
const gulpif = require('gulp-if');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const util = require('gulp-util');
const runSequence = require('run-sequence');
const reactify = require('reactify');

var log = require('gulplog');


















// CONCATINATE JS SCRIPTS
const concatScripts = () => {
    /*log(chalk.red.bold('---------------CONCATINATE SCRIPTS---------------')); */
    return src([
        'src/assets/vendor/js/jquery.js',
        'src/assets/vendor/js/popper.js',
        'src/assets/vendor/js/bootstrap.js',
        'src/assets/js/util/autoPadding.js',
        'src/assets/js/util/crossPlatform.js',
        'src/assets/js/*'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(dest('dist/assets/js'))
        .pipe(browserSync.stream());
}
// COPY CUSTOM JS
const compileJS = () => {
    var b = browserify({
        entries: 'src/app.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [reactify]
      });
  
    /*log(chalk.red.bold('---------------COMPILE CUSTOM.JS---------------')); */
    //return src(['src/assets/js/**/*.js'])
    return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(babel({presets: ['@babel/preset-env'] })) 

    //.pipe(uglify())
    .pipe(dest('dist/assets/js/'))
    .pipe(browserSync.stream());
  }
// JS LINTER
const jsLint = () => {
    return src('src/assets/js/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
  }


export {
    concatScripts,
    jsLint,
    compileJS
}