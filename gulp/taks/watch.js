const { src, dest, watch, series, parallel } = require('gulp');
import { html } from '../taks/html';
import { scss } from '../taks/scss';
import { compileJS } from '../taks/scripts';
import { imagenes } from '../taks/imagenes';

// WATCH FILES
const watchFiles = () => {
  watch('src/**/*.html', html );
  watch(['src/assets/scss/**/*.scss', 'src/assets/scss/*.scss'], scss);
  watch('src/assets/js/*.js', compileJS);
  watch('src/assets/img/**/*', imagenes);
}

export {
  watchFiles
}