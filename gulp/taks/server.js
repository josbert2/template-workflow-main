const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
// BROWSER SYNC
const browserSyncInit = (done) => {
  /*log(chalk.red.bold('---------------BROWSER SYNC INIT---------------')); */
  browserSync.init({
    server: './dist'
  });
  return done();
}

export {
  browserSyncInit
}