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
        views: 'template/',
        js: 'template/assets/js/',
        css: 'template/assets/css/',
        img: 'template/assets/images/',
        fonts: 'template/assets/fonts/'
    },
    component: {
        js: 'assets/components/minishop2.com/js/',
        css: 'assets/components/minishop2.com/css/',
        img: 'assets/components/minishop2.com/images/',
        fonts: 'assets/components/minishop2.com/fonts/'
    },
    src: {
        views: 'src/*.pug',
        js: [
            'src/assets/js/*.js',
            '!src/assets/js/_*.*'
        ],
        css: 'src/assets/scss/style.scss',
        img: 'src/assets/images/**/*.*',
        fonts: 'src/assets/fonts/**/*.*',
        templates: 'src/assets/templates/'  // Pug templates
    },
    watch: {
        views: 'src/**/*.pug',
        js: 'src/assets/js/**/*.js',
        css: 'src/assets/scss/**/*.scss',
        img: 'src/assets/images/**/*.*',
        fonts: 'src/assets/fonts/**/*.*'
    },
	clean: './template'
};


// Tasks


gulp.task('html:build', function () {
	return gulp.src(path.src.views)
		.pipe(plumber())
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(gulp.dest(path.template.views));
});


gulp.task('css:build', function () {
	return gulp.src(path.src.css)
		.pipe(plumber())
		.pipe(wait(500))
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([
            cssbeautify()
        ]))
		.pipe(gulp.dest(path.template.css))
		.pipe(postcss([
            autoprefixer(),
		    cssnano()
        ]))
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest(path.component.css));
});


gulp.task('js:build', function () {
	return gulp.src(path.src.js)
		.pipe(plumber())
		.pipe(include({
			extensions: 'js'
		}))
		.pipe(gulp.dest(path.template.js))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest(path.component.js));
});


gulp.task('fonts:build', function () {
	return gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.template.fonts))
		.pipe(gulp.dest(path.component.fonts));
});


gulp.task('image:build', function () {
	return gulp.src(path.src.img)
        .pipe(gulp.dest(path.template.img))
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true
		}))
		.pipe(gulp.dest(path.component.img));
});


gulp.task('build', gulp.series(
	'html:build',
	'css:build',
	'js:build',
	'fonts:build',
	'image:build',
));


gulp.task('watch', function () {
	watch([path.watch.views], gulp.series('html:build'));
	watch([path.watch.css], gulp.series('css:build'));
	watch([path.watch.js], gulp.series('js:build'));
	watch([path.watch.img], gulp.series('image:build'));
	watch([path.watch.fonts], gulp.series('fonts:build'));
});


gulp.task('default', gulp.series(
	'build',
	'watch'
));
