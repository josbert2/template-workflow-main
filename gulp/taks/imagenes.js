const { src, dest, watch, series, parallel } = require('gulp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');

const browserSync = require('browser-sync').create();
// COPIES AND MINIFY IMAGE TO DIST


const imagenes = () => {
    /* log(chalk.red.bold('---------------OPTIMIZING IMAGES---------------')); */
    return src('src/assets/img/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(newer('dist/assets/img/'))
        .pipe(imagemin())
        .pipe(dest('dist/assets/img/'))
        .pipe(browserSync.stream());
}

export {
    imagenes
}