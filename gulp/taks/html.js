const { src, dest, watch, series, parallel } = require('gulp');
const panini = require('panini');
const htmllint = require('gulp-htmllint');
const browserSync = require('browser-sync').create();
const colors = require('ansi-colors');
const chalk = require('chalk');
const accessibility = require('gulp-accessibility');
const prettyHtml = require('gulp-pretty-html');
const rename = require('gulp-rename');

import { getEnv, log, gulpconfig } from '../utils';

const env = getEnv()


console.log(gulpconfig.paths.sources.html.root)
const root = gulpconfig.paths.sources.html.root
const html = () => {
    /*log(chalk.red.bold('---------------COMPILING HTML WITH PANINI---------------')); */
    panini.refresh();
    return src(`src/${root}html/pages/**/*.html`)
        .pipe(panini({
            root: `src/${root}html/pages/`,
            layouts: `src/${root}html/layouts/`,
            // pageLayouts: {
            // All pages inside src/template/html/pages/blog will use the blog.html layout
            //     'blog': 'blog'
            // }`src/
            partials: `src/${root}html/partials/`,
            helpers: `src/${root}html/helpers/`,
            data: `src/${root}html/data/`
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// PRETTIFY HTML FILES
const prettyHTML = () => {
    log(chalk.red.bold('---------------HTML PRETTIFY---------------'));
    return src('dist/**/*.html')
      .pipe(prettyHtml({
        indent_size: 4,
        indent_char: ' ',
        unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
      }))
      .pipe(dest('dist'));
  }

const htmllintReporter =  (filepath, issues) => {
    if (issues.length > 0) {
      issues.forEach(function (issue) {
        console.log(colors.cyan('[gulp-htmllint] ') + colors.white(filepath + ' [' + issue.line + ']: ') + colors.red('(' + issue.code + ') ' + issue.msg)); 
      });
      process.exitCode = 1;
    } else {
       console.log('Error htmlLint');
    }
  }
// HTML LINTER
const htmlLint = () => {
   /* log(chalk.red.bold('---------------HTML LINTING---------------')); */
    return src('dist/**/*.html')
      .pipe(htmllint({}, htmllintReporter));
  }

  // ACCESSIBILITY CHECK
const HTMLAccessibility = () => {
    return src('dist/**/*.html')
      .pipe(accessibility({
        force: true
      }))
      .on('error', console.log)
      .pipe(accessibility.report({
        reportType: 'txt'
      }))
      .pipe(rename({
        extname: '.txt'
      }))
      .pipe(dest('accessibility-reports'));
  }

export {
    html,
    htmlLint,
    prettyHTML,
    HTMLAccessibility
}