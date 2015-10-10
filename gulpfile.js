var gulp       = require( 'gulp' );
var rename     = require( 'gulp-rename' );
var compass    = require( 'gulp-compass' );
var concat     = require( 'gulp-concat' );
var sourcemaps = require( 'gulp-sourcemaps' );

var source     = require( 'vinyl-source-stream' );
var buffer     = require( 'vinyl-buffer' );
var browserify = require( 'browserify' );
var watchify   = require( 'watchify' );
var babel      = require( 'babelify' );



function compile(watch) {
  var bundler = watchify(browserify('./src/index.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};


gulp.task( 'js', function() {
    gulp.src( 'src/js/elements/*.js' )
        .pipe(babel())
        .pipe(concat( 'elements.js' ))
        .pipe(gulp.dest( './dist/js/' ));

    compile(false);
});

gulp.task( 'sass', function() {
    gulp.src( 'src/sass' )
        .pipe(compass({
            images : 'images',
            sass: 'src/sass',
            css: 'dist/css'
        }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task( 'watch', function() {
    watch();

    gulp.watch( 'src/sass/**/*.scss', [ 'sass' ] );
});

gulp.task( 'default', [ 'js', 'sass' ] );
