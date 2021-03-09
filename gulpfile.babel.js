
const { src, dest, watch, series, parallel } = require('gulp');
import { scss, scssLint } from './gulp/taks/scss';
import { html, htmlLint, prettyHTML, HTMLAccessibility } from './gulp/taks/html';
import { jsLint, compileJS, concatScripts } from './gulp/taks/scripts';
import { imagenes } from './gulp/taks/imagenes';
import { copyFont } from './gulp/taks/fonts';
import { deploy } from './gulp/taks/deploy';
import { renameSources } from './gulp/taks/rename';
import { cssVendor, jsVendor } from './gulp/taks/vendors';
import { minifyCss, minifyScripts } from './gulp/taks/minify';
import { generateDocs } from './gulp/taks/docs';
import { resetPages } from './gulp/taks/refresh';
import { cleanDist } from './gulp/taks/clean';
import { browserSyncInit } from './gulp/taks/server';
import { watchFiles } from './gulp/taks/watch';


/*DEPENDENCIA  */

//gulp development --tmp=template

// DEVELOPMENT
exports.development = series(cleanDist, copyFont, jsVendor, cssVendor, imagenes, html, compileJS, resetPages, prettyHTML, scss, browserSyncInit, watchFiles);

// PRODUCTION
exports.production = series(cleanDist, scss, copyFont, imagenes, html, concatScripts, minifyScripts, minifyCss, renameSources, prettyHTML, generateDocs, browserSyncInit);

// RUN ALL LINTERS
exports.lint = series(htmlLint, scssLint, jsLint);

// RUN ACCESSIBILITY CHECK
exports.a11y = HTMLAccessibility;


export {
  scss,
  html,
  jsLint,
  htmlLint,
  prettyHTML,
  HTMLAccessibility,
  concatScripts,
  compileJS,
  imagenes,
  scssLint,
  renameSources,
  generateDocs,
  resetPages,
  browserSyncInit,
  copyFont,
  cssVendor,
  jsVendor,
  deploy,
  watchFiles
}

