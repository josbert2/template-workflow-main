
const { src, dest, watch, series, parallel } = require('gulp');
const htmlreplace = require('gulp-html-replace');

const renameSources = () => {
    /*log(chalk.red.bold('---------------RENAMING SOURCES---------------')); */
    return src('dist/**/*.html')
      .pipe(htmlreplace({
        'js': 'assets/js/main.min.js',
        'css': 'assets/css/main.min.css'
      }))
      .pipe(dest('dist/'));
  }
  export{
    renameSources
  }