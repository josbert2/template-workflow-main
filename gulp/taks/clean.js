const { src, dest, watch, series, parallel } = require('gulp');
const del = require('del');

// DELETE DIST FOLDER
const cleanDist = (done) => {
    /*log(chalk.red.bold('---------------REMOVING OLD FILES FROM DIST---------------')); */
    del.sync('dist');
    return done();
  }

  export {
    cleanDist
  }