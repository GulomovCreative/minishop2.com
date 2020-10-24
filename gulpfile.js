'use strict';

const gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssbeautify = require('postcss-prettify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  cssnano = require('cssnano'),
  wait = require('gulp-wait'),
  include = require('gulp-include'),
  terser = require('gulp-terser'),
  watch = require('gulp-watch'),
  plumber = require('gulp-plumber'),
  babel = require('gulp-babel'),
  imagemin = require('gulp-imagemin'),
  pug = require('gulp-pug');

// Path
const path = {
  template: {
    views: 'template/landing/',
    js: 'template/landing/assets/js/',
    css: 'template/landing/assets/css/',
    img: 'template/landing/assets/images/',
    fonts: 'template/landing/assets/fonts/',
  },
  componentLanding: {
    js: 'assets/components/minishop2.com/landing/assets/js/',
    css: 'assets/components/minishop2.com/landing/assets/css/',
    img: 'assets/components/minishop2.com/landing/assets/images/',
    fonts: 'assets/components/minishop2.com/landing/assets/fonts/',
    views: 'assets/components/minishop2.com/landing/',
  },
  src: {
    views: 'src/landing/*.pug',
    js: ['src/landing/assets/js/*.js', '!src/landing/assets/js/_*.*'],
    css: 'src/landing/assets/scss/style.scss',
    img: 'src/landing/assets/images/**/*.*',
    fonts: 'src/landing/assets/fonts/**/*.*',
    templates: 'src/landing/assets/templates/', // Pug templates
  },
  watch: {
    views: 'src/landing/**/*.pug',
    js: 'src/landing/assets/js/**/*.js',
    css: 'src/landing/assets/scss/**/*.scss',
    img: 'src/landing/assets/images/**/*.*',
    fonts: 'src/landing/assets/fonts/**/*.*',
  },
  clean: './template/landing',
};
const pathSite = {
  template: {
    views: 'template/site/',
    js: 'template/site/assets/js/',
    css: 'template/site/assets/css/',
    img: 'template/site/assets/images/',
    fonts: 'template/site/assets/fonts/',
  },
  componentLanding: {
    js: 'assets/components/minishop2.com/site/assets/js/',
    css: 'assets/components/minishop2.com/site/assets/css/',
    img: 'assets/components/minishop2.com/site/assets/images/',
    fonts: 'assets/components/minishop2.com/site/assets/fonts/',
    views: 'assets/components/minishop2.com/site/',
  },
  src: {
    views: 'src/site/pages/*.pug',
    js: ['src/site/assets/js/*.js', '!src/site/assets/js/_*.*'],
    css: 'src/site/assets/scss/style.scss',
    img: 'src/site/assets/images/**/*.*',
    fonts: 'src/site/assets/fonts/**/*.*',
    templates: 'src/site/assets/pages/', // Pug templates
  },
  watch: {
    views: 'src/site/**/*.pug',
    js: 'src/site/assets/js/**/*.js',
    css: 'src/site/assets/scss/**/*.scss',
    img: 'src/site/assets/images/**/*.*',
    fonts: 'src/site/assets/fonts/**/*.*',
  },
  clean: './template/site',
};

// Tasks

gulp.task('html:build', function () {
  return gulp
    .src(path.src.views)
    .pipe(plumber())
    .pipe(
      pug({
        pretty: '\t',
      })
    )
    .pipe(gulp.dest(path.componentLanding.views));
});

gulp.task('htmlSite:build', function () {
  return gulp
    .src(pathSite.src.views)
    .pipe(plumber())
    .pipe(
      pug({
        pretty: '\t',
      })
    )
    .pipe(gulp.dest(pathSite.componentLanding.views));
});

gulp.task('css:build', function () {
  return gulp
    .src(path.src.css)
    .pipe(plumber())
    .pipe(wait(500))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([cssbeautify()]))
    .pipe(gulp.dest(path.template.css))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(path.componentLanding.css));
});

gulp.task('cssSite:build', function () {
  return gulp
    .src(pathSite.src.css)
    .pipe(plumber())
    .pipe(wait(500))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([cssbeautify()]))
    .pipe(gulp.dest(pathSite.template.css))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(pathSite.componentLanding.css));
});

gulp.task('js:build', function () {
  return gulp
    .src(path.src.js)
    .pipe(plumber())
    .pipe(
      include({
        extensions: 'js',
      })
    )
    .pipe(gulp.dest(path.template.js))
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(terser())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(path.componentLanding.js));
});

gulp.task('jsSite:build', function () {
  return gulp
    .src(pathSite.src.js)
    .pipe(plumber())
    .pipe(
      include({
        extensions: 'js',
      })
    )
    .pipe(gulp.dest(pathSite.template.js))
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(terser())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(pathSite.componentLanding.js));
});

gulp.task('fonts:build', function () {
  return gulp
    .src(path.src.fonts)
    .pipe(gulp.dest(path.template.fonts))
    .pipe(gulp.dest(path.componentLanding.fonts));
});

gulp.task('fontsSite:build', function () {
  return gulp
    .src(pathSite.src.fonts)
    .pipe(gulp.dest(pathSite.template.fonts))
    .pipe(gulp.dest(pathSite.componentLanding.fonts));
});

gulp.task('image:build', function () {
  return gulp
    .src(path.src.img)
    .pipe(gulp.dest(path.template.img))
    .pipe(
      imagemin({
        optimizationLevel: 3,
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
      })
    )
    .pipe(gulp.dest(path.componentLanding.img));
});

gulp.task('imageSite:build', function () {
  return gulp
    .src(pathSite.src.img)
    .pipe(gulp.dest(pathSite.template.img))
    .pipe(
      imagemin({
        optimizationLevel: 3,
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
      })
    )
    .pipe(gulp.dest(pathSite.componentLanding.img));
});

gulp.task(
  'build',
  gulp.series(
    'html:build',
    'css:build',
    'js:build',
    'fonts:build',
    'image:build'
  )
);

gulp.task(
  'buildSite',
  gulp.series(
    'htmlSite:build',
    'cssSite:build',
    'jsSite:build',
    'fontsSite:build',
    'imageSite:build'
  )
);

gulp.task('watch', function () {
  watch([path.watch.views], gulp.series('html:build'));
  watch([path.watch.css], gulp.series('css:build'));
  watch([path.watch.js], gulp.series('js:build'));
  watch([path.watch.img], gulp.series('image:build'));
  watch([path.watch.fonts], gulp.series('fonts:build'));
});

gulp.task('watchSite', function () {
  watch([pathSite.watch.views], gulp.series('htmlSite:build'));
  watch([pathSite.watch.css], gulp.series('cssSite:build'));
  watch([pathSite.watch.js], gulp.series('jsSite:build'));
  watch([pathSite.watch.img], gulp.series('imageSite:build'));
  watch([pathSite.watch.fonts], gulp.series('fontsSite:build'));
});

gulp.task('default', gulp.series('build', 'watch'));
gulp.task('defaultSite', gulp.series('buildSite', 'watchSite'));
