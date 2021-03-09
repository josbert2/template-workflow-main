const { src, dest, watch, series, parallel } = require('gulp');
const ghPages = require('gulp-gh-pages');


// DEPLOY TO GIT
const deploy = () => {
    return src('/*')
        .pipe(ghPages({
            remoteUrl: 'https://github.com/johndavemanuel/bootstrap4-gulp-starter-template.git',
            branch: 'master',
            message: 'Automated push of contents via gulp'
        }));
}