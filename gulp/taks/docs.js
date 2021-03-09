const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();

// CREATE DOCS FOLDER FOR DEMO
const generateDocs = () => {
    /*log(chalk.red.bold('---------------CREATING DOCS---------------')); */
    return src([
        'dist/**/*',
      ])
      .pipe(dest('docs'))
      .pipe(browserSync.stream());
  }

  export{
    generateDocs
  }