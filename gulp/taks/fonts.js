const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();



// PLACES FONT FILES IN THE DIST FOLDER
const copyFont = () => {
    /*log(chalk.red.bold('---------------COPYING FONTS INTO DIST FOLDER---------------')); */
    return src([
        'src/assets/font/*',
    ])
        .pipe(dest('dist/assets/fonts'))
        .pipe(browserSync.stream());
}


export {
    copyFont
}