const { src, dest, watch, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const cssmin = require('gulp-cssmin');
const sourcemaps = require('gulp-sourcemaps');
const removeCode = require('gulp-remove-code');
const removeLog = require('gulp-remove-logging');
const uglify = require('gulp-uglify-es').default;
// MINIFY CSS
const minifyCss = () => {
    /*log(chalk.red.bold('---------------MINIFY CSS---------------')); */
    return src([
        'src/assets/vendor/css/**/*',
        'dist/assets/css/main.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(cssmin())
        .pipe(rename('main.min.css'))
        .pipe(dest('dist/assets/css'));
}

// MINIFY SCRIPTS
const minifyScripts = () => {
   /* log(chalk.red.bold('---------------MINIFY SCRIPTS---------------')); */
    return src('dist/assets/js/main.js')
      .pipe(removeLog())
      .pipe(removeCode({
        production: true
      }))
      .pipe(uglify().on('error', console.error))
      .pipe(rename('main.min.js'))
      .pipe(dest('dist/assets/js'));
  }

export {
    minifyCss,
    minifyScripts
}