const { src, dest, watch, series, parallel } = require('gulp');
const chalk = require('chalk');
const browserSync = require('browser-sync').create();




// COPY CSS VENDOR FILES
const cssVendor = () => {
    /* log(chalk.red.bold('---------------COPY CSS VENDOR FILES INTO DIST---------------')); */
    return src([
        'src/assets/vendor/css/*',
    ])
        .pipe(dest('dist/assets/vendor/css'))
        .pipe(browserSync.stream());
}


// COPY JS VENDOR FILES
const jsVendor = () => {
    /* log(chalk.red.bold('---------------COPY JAVASCRIPT VENDOR FILES INTO DIST---------------')); */
    return src([
        'src/assets/vendor/js/*',
    ])
        .pipe(dest('dist/assets/vendor/js'))
        .pipe(browserSync.stream());
}


export {
    cssVendor,
    jsVendor
}