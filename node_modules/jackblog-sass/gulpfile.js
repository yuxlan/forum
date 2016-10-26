'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var compass = require('gulp-compass');
var gulpSequence = require('gulp-sequence');
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var filter = require('gulp-filter');
var flatten = require('gulp-flatten');
var replace = require('gulp-replace');
var csso = require('gulp-csso');
var rename = require("gulp-rename");

/***************** clean start *********************************************/
gulp.task('clean', function () {
  del([path.join(__dirname, '/dist'), path.join(__dirname, '/.tmp')]);
});


gulp.task('other',function () {
	return gulp.src([
			path.join(__dirname,'src/assets/**/*'),
			path.join('!' + __dirname, 'src/assets/images/**/*')
		])
		.pipe(filter(function (file) {
			return file.stat.isFile();
		}))
		.pipe(gulp.dest(path.join(__dirname,'dist/assets')));
});

/*****************图片压缩 start*********************/
gulp.task('images',function () {
	return gulp.src([
			path.join(__dirname, 'src/assets/images/**/*'),
			path.join('!' + __dirname, 'src/assets/images/sprite/**/*')
		])
		.pipe(imagemin({
		    progressive: true,
		    svgoPlugins: [{removeViewBox: false}],
		    use: [imageminPngquant()]
		}))
		.pipe(gulp.dest(path.join(__dirname,'dist/assets/images')));
});

gulp.task('compass', function () {
  return gulp.src(path.join(__dirname,'src/scss/index.scss'))
  	.pipe(compass({
  		config_file: path.join(__dirname, 'config.rb'),
  	  css: path.join(__dirname, 'dist'),
  	  sass: path.join(__dirname, 'src/scss'),
  	  //其余项都在config.rb中配置
  	}))
  	.pipe(replace('../src/assets/images', './assets/images'))
  	.pipe(gulp.dest(path.join(__dirname,'dist')))
});

gulp.task('minify', function () {
  return gulp.src(path.join(__dirname,'dist/index.css'))
  	.pipe(csso())
  	.pipe(rename('index.min.css'))
  	.pipe(gulp.dest(path.join(__dirname,'dist')))
});

gulp.task('build',gulpSequence('compass',['images','other'],'minify'));

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});