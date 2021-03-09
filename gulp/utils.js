import minimist from 'minimist'
const pkg = require('../package.json')
var argv = require('yargs').argv;
const args = minimist(process.argv.slice(2))

const getEnv = () => {
  const activeEnvs = {}
  const envs = [
    'dist',
    'dev',
    'deploy',
    'mapped',
    'stat',
  ]
  for (let i = 0; i < envs.length; i++) {
    activeEnvs[envs[i]] = args[envs[i]]
  }
  return activeEnvs
}
const env = getEnv()
const log = (n) => {
  console.log(n)
}
const tmp = args.tmp
const gulpconfig = {
  pkg: {
    name: pkg.name,
  },
  pluginOpts: {
    browserSync: {
      port: 1987,
      server: {
        baseDir: env,
      },
    },
    gSize: {
      showFiles: true,
    },
    pug: {
      pretty: true,
      data: {
        description: pkg.description,
        name: pkg.name,
        version: pkg.version,
      },
    },
    load: {
      rename: {
        'gulp-gh-pages': 'deploy',
        'gulp-cssnano': 'minify',
        'gulp-autoprefixer': 'prefix',
      },
    },
    prefix: ['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4'],
    rename: {
      suffix: '.min',
    },
    stylint: {
      reporter: 'stylint-stylish',
    },
  },
  paths: {
    base: env,
    sources: {
      docs: 'src/markup/*.pug',
      markup: 'src/markup/**/*.pug',
      overwatch: env + '**/*.{html,js,css}',
      scripts: {
        root: 'src/script/index.js',
        all: 'src/script/**/*.js',
      },
      styles: {
        root: 'src/style/style.styl',
        all: 'src/style/**/*.styl',
      },
      html:{
        root: `src/${tmp}`
      }
    },
    destinations: {
      css: env + 'css/',
      html: env,
      js: env + 'js/',
    },
  },
}


export {
  getEnv,
  gulpconfig,
  log
}