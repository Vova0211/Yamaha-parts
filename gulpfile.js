const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

function buildStyles() {
  return src('./src/styles/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(dest('dist/'));
}

/*function buildMedia() {
  return src('./src/styles/media.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(dest('build/'));
}*/

function buildJs() {
  return src('src/js/script.js')
    .pipe(uglify())
    .pipe(dest('dist/'));
}

function buildHTML() {
  return src('src/pages/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'));
}

function watchStyle() { watch('src/styles/style.scss', buildStyles)}
function watchJS() {  watch('src/js/*.js', buildJs)}
function watchHTML() {  watch('src/pages/*.html', buildHTML)}
// function watchMedia() { watch('src/styles/media.scss', buildMedia)}

exports.build = series(buildStyles, /*buildMedia,*/ buildJs, buildHTML)
exports.developer = parallel(watchHTML, watchJS, watchStyle/*, watchMedia*/)
