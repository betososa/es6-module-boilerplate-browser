"use strict";

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const hbsfy = require('hbsfy');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const del = require('del');

// Bundle files with browserify
gulp.task('browserify', () => {
  let bundler = browserify({
    entries: './src/index.js',
    debug: true,
    transform: [babelify, hbsfy],
    paths: ['./src'],
    extensions: ['hbs', 'js'],
  });

  bundler = watchify(bundler);

  const rebundle = () => {
    return bundler.bundle()
      .on('error', $.util.log)
      .on('end', reload)
      .pipe(source('./src/index.js'))
      .pipe(buffer())
      .pipe($.sourcemaps.init({ loadMaps: true }))
        // Add transformation tasks to the pipeline here.
        .on('error', $.util.log)
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest('./server'));
  };

  bundler.on('update', rebundle);
  rebundle();
});

// Clean output directory and cache
gulp.task('clean', (cb) => {
  del(['server/src', 'dist']).then(() => {
    $.cache.clearAll(cb);
  });
});

// Run development server environment
gulp.task('serve', ['browserify'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: {
      port: 9001,
    },
    server: {
      baseDir: ['server', 'node_modules', 'test'],
    },
  });

  gulp.watch(['test/**/*.js']).on('change', reload);
});

// Start developing the module
gulp.task('default', ['clean'], () => {
  gulp.start('serve');
});
