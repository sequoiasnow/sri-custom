var gulp       = require( 'gulp' );
var reactify   = require( 'reactify' );
var rename     = require( 'gulp-rename' );
var browserify = require( 'gulp-browserify' );
var webserver  = require( 'gulp-webserver' );
var compass    = require( 'gulp-compass' );

gulp.task( 'js', function() {
    gulp.src( 'src/main.js' )
        .pipe(browserify({
            insertGlobals : true,
            transform: [ reactify ]
        }))
        .pipe(rename( 'compiled.js' ))
        .pipe(gulp.dest('./dist/js'));
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
    gulp.watch( 'src/**/**/*.js', [ 'js' ] );

    gulp.watch( 'src/sass/**/*.scss', [ 'sass' ] );
});

gulp.task( 'server', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});
});

gulp.task( 'default', [ 'js' ] );
