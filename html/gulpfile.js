var gulp = require('gulp'),
   sass = require('gulp-sass'),
   concat = require('gulp-concat'),
   autoprefixer = require('gulp-autoprefixer'),
   cleanCSS = require('gulp-clean-css'),
   terser = require('gulp-terser'),
   del = require('del'),
   imagemin = require('gulp-imagemin'),
   htmlmin = require('gulp-htmlmin'),
   imageminJpegRecompress = require('imagemin-jpeg-recompress'),
   browserSync = require('browser-sync').create(),
   uglify = require('gulp-uglify');
   csscomb = require('gulp-csscomb');

var stylesFiles = [
   './src/style/**/*.scss'
];

var jsFiles = [
   './src/js/**/*.js',
   '!./src/js/scripts.js'
];

var imgFiles = [
   './src/img/**/*.png',
   './src/img/**/*.jpg',
   './src/img/**/*.gif',
   './src/img/**/*.svg'
];

function styles() {
   return gulp.src(stylesFiles)
      .pipe(sass({
         includePaths: require('node-normalize-scss').includePaths
      }))
      .pipe(csscomb())  
      .pipe(concat('styles.css'))
      .pipe(autoprefixer({
         browserslistrc: ['last 2 versions'],
         cascade: false
      }))
      .pipe(cleanCSS({
         level: 2
      }))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.stream());
   }


function scripts() {
   return gulp.src(jsFiles)
      .pipe(uglify({ mangle: true }))
      .pipe(concat('scripts.js'))
      .pipe(gulp.dest('./dist/assets/js'))
      .pipe(browserSync.stream());
}

function minimg() {
   return gulp.src(imgFiles)
      .pipe(
         imagemin([
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imageminJpegRecompress({
               loops: 3,
               min: 65,
               max: 75,
               quality: 'high'
            }),
            imagemin.svgo(),
         ]),
      )
      .pipe(gulp.dest('./dist/assets/img'))
}

function minhtml() {
   return gulp.src('./src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./dist'));
}


function clean() {
   return del(['dist/assets/css/**/*.css'])
}

function watch() {
   browserSync.init({
      server: {
         baseDir: "./dist/",
         index: "index.html"
      }
   });

   gulp.watch('./src/styles/**/*.scss', styles);
   gulp.watch('./src/styles/css/**/*.css').on('change', browserSync.reload);
   gulp.watch(['./src/js/**/*.js', '!./src/js/scripts.js'], scripts);
   gulp.watch('./src/*.html').on('change', gulp.series(minhtml, browserSync.reload));
}

exports.styles = styles;
exports.scripts = scripts;
exports.delcss = clean;
exports.images = minimg;
exports.html = minhtml;
exports.watch = watch;
exports.build = gulp.series(clean, gulp.parallel(minhtml, styles, scripts, minimg));
exports.dev = gulp.series(exports.build, watch);
