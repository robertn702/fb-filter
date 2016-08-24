const $ = require('gulp-load-plugins')();
const Promise = require('bluebird');
const beautifyJs = require('node-beautify').beautifyJs;
const fs = require('fs');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const webpack = require('webpack-stream');

/* ============ DIRECTORY CONSTANTS ============ */

/* SRC PATHS */
const SRC_DIR = 'src/';
const SRC_IMAGES_DIR = SRC_DIR + 'images/';
const SRC_SCRIPTS_DIR = SRC_DIR + 'js/';
const SRC_STYLES_DIR = SRC_DIR + 'styles/';

/* DIST PATHS */
const DIST_DIR = 'dist/';
const DIST_IMAGES_DIR = DIST_DIR + 'images/';
const DIST_SCRIPTS_DIR = DIST_DIR + 'js/';
const DIST_STYLES_DIR = DIST_DIR + 'styles/';

function onError(err) {
  console.log('[gulpfile] err: ', err);
  process.exit(1);
}

gulp.task('build', () => {
  $.util.env.env = process.env.NODE_ENV || $.util.env.env || 'development';
  console.log('[gulpfile] $.util.env.env: ', $.util.env.env);
  runSequence([
      // '_html',
      // '_images',
      '_javascript',
      '_manifest',
      '_styles'
    ]
  );
});

gulp.task('pack', () => {
  $.util.env.env = 'production';
  runSequence(
    '_clean',
    [
      // '_html',
      // '_images',
      '_javascript',
      '_manifest',
      '_styles'
    ],
    '_zip'
  );
});

gulp.task('_clean', () => {
  return gulp.src(DIST_DIR + '*')
    .pipe($.clean());
});

gulp.task('_zip', () => {
  return gulp.src(DIST_DIR + '**/*')
    .pipe($.zip('fb-filter.zip'))
    .pipe(gulp.dest(DIST_DIR))
    ;
});

/* ==========  VALIDATION TASKS ============ */

gulp.task('_lint', () => {
  return gulp.src([
      SRC_SCRIPTS_DIR + '**/*.js'
    ])
    .pipe($.eslint())
    .pipe($.eslint.format());
    // .pipe($.eslint.failOnError());
});

gulp.task('_lint-no-fail', () => {
  return gulp.src([
      SRC_SCRIPTS_DIR + '**/*.js'
    ])
    .pipe($.eslint())
    .pipe($.eslint.format());
});

/* ============ JAVASCRIPT TASKS ============ */

gulp.task('_javascript', [
  '_webpack'
  // '_move'
]);

gulp.task('_webpack', () => {
  const env = process.env.NODE_ENV || $.util.env.env || 'development';
  let path;
  switch(env) {
    case 'development':
      path = 'development';
      break;
    case 'production':
      path = 'production';
      break;
    default:
      path = env;
  }

  const webpackConfig = require(`./webpack.${path}.config.js`);

  return gulp.src(SRC_SCRIPTS_DIR + 'content.js')
    .pipe($.plumber({
      errorHandler(err) {
        console.log('[gulpfile] err: ', err);
        this.emit('end');
      }
    }))
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(DIST_SCRIPTS_DIR))
    ;
});

// gulp.task('_move', () => {
//   return gulp.src([SRC_SCRIPTS_DIR + '*.js'])
//     .pipe(gulp.dest(DIST_SCRIPTS_DIR));
// });

gulp.task('_manifest', () => {
  const manifest = require('./manifest');
  const writeFile = Promise.promisify(fs.writeFile);
  writeFile(DIST_DIR + 'manifest.json', beautifyJs(JSON.stringify(manifest), {indentSize: 2}))
    .then(() => {
      console.log('[gulpfile] successfully create manifest.json');
    })
    .catch(() => {
      return new Promise((resolve, reject) => {
        fs.mkdir(DIST_DIR, (err) => {
          if (err) {
            return reject(err);
          }
          return writeFile(DIST_DIR + 'manifest.json', JSON.stringify(manifest))
            .then(() => {
              console.log('[gulpfile] successfully create manifest.json');
            });
        });
      });
    })
    .catch((err) => {
      console.log('[gulpfile] err: ', err);
    });
});

/* =============== CSS TASKS ================ */

gulp.task('_styles', ['_compile-sass']);

// compile the sass files
gulp.task('_compile-sass', () => {
  const env = process.env.NODE_ENV || $.util.env.env || 'development';
  console.log('[gulpfile] env: ', env);
  return gulp.src([SRC_STYLES_DIR + 'content/content.scss', SRC_STYLES_DIR + 'popup/popup.scss'])
    .pipe($.plumber({
      errorHandler(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested',
      includePaths: [
        // include paths to node modules with scripts to be imported
      ],
      precision: 10,
      onError(err) {
        return $.notify().write(err);
      }
    }))
    .pipe($.postcss([
      require('postcss-import')(),
      require('autoprefixer')({ browsers: ['> 0%'] })
    ]))
    .pipe(env === 'production'
      ? $.csso()
      : $.util.noop()
    )
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(DIST_STYLES_DIR))
    ;
});

/* =============== HTML TASKS ================ */

// preprocess the html files - if the environment is prod - it will include the minified files
gulp.task('_html', () => {
  const env = process.env.NODE_ENV || $.util.env.env || 'development';
  // replacement strings for static path and minification
  return gulp.src(SRC_DIR + '/*.html')
    .pipe(env === 'production'
      ? $.minifyHtml({conditionals: true, loose: true})
      : $.util.noop()
    )
    .pipe(gulp.dest(DIST_DIR))
    ;
});

/* =============== IMAGE TASKS ============== */

// gulp.task('_images', () => {
  // return gulp.src(SRC_IMAGES_DIR + '**/*')
    /* imagemin doesn't work on centos 64bit, disable this for now
      .pipe($.cache($.imagemin({
        progressive: true,
        interlaced: true,
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{
          cleanupIDs: false
        }]
      })))*/
    // .pipe(gulp.dest(DIST_IMAGES_DIR))
    // ;
// });


/* =============== DEV TASKS ============== */

gulp.task('dev', ['build'], () => {
  gulp.watch('manifest.js', ['_manifest']);
  gulp.watch([SRC_SCRIPTS_DIR + '**/*.js', SRC_SCRIPTS_DIR + '**/*.jsx'], ['_javascript']);
  gulp.watch(SRC_STYLES_DIR + '**/*.scss', ['_styles']);
  gulp.watch(SRC_DIR + '*.html', ['_html']);
});

gulp.task('dev-lint', () => {
  gulp.watch([SRC_SCRIPTS_DIR + '**/*.js', SRC_SCRIPTS_DIR + '**/*.jsx'], ['_lint']);
});

/* =============== OTHER TASKS ============== */
