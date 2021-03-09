const { src, dest, watch, series, parallel } = require('gulp');
const panini = require('panini');
// RESET PANINI'S CACHE OF LAYOUTS AND PARTIALS
const resetPages = (done) => {
    /*log(chalk.red.bold('---------------CLEARING PANINI CACHE---------------')); */
    panini.refresh();
    done();
  }
  
  export{
      resetPages
  }
  