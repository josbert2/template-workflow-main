
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const autoprefixer = require('gulp-autoprefixer');
const bourbon = require('node-bourbon').includePaths;
const sassLint = require('gulp-sass-lint');
const plumber = require('gulp-plumber');
const replace = require('gulp-replace');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const browserSync = require('browser-sync').create();
import { getEnv, gulpconfig } from '../utils';

const env = getEnv()

// COMPILE SCSS INTO CSS
const scss = () => {
  var prefixerOptions = {
    browsers: ['last 2 versions']
  };
  return src(['src/assets/scss/main.scss', 'src/assets/scss/rtl.scss'])
    .pipe(plumber())
    .pipe(gulpif(!env.dev, sourcemaps.init()))
    .pipe(sass({
      outputStyle: 'expanded',
      sourceComments: 'map',
      sourceMap: 'scss',
      includePaths: bourbon
    }).on('error', sass.logError))
    .pipe(replace(/({{|}}|{%|%})/g, '/*!$1*/')) // Comment out Liquid tags, so post-css doesn't trip out
    .pipe(autoprefixer(prefixerOptions))
    .pipe(replace(/\/\*!({{|}}|{%|%})\*\//g, '$1')) // Re-enable Liquid tags
    .pipe(gulpif(!env.dev, sourcemaps.write('.')))
    .pipe(gulpif(env.dev, cssmin()))
    .pipe(dest('dist/assets/css'))
    .pipe(browserSync.stream());
}

// SCSS LINT
const scssLint = () => {
  /*log(chalk.red.bold('---------------SCSS LINTING---------------')); */
  return src('src/assets/scss/**/*.scss')
    .pipe(sassLint({
      configFile: '../../scss-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
}



export {
  scss,
  scssLint
}