// Include Gulp
var gulp = require('gulp');

// Include required Gulp packages
var concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename')
    ;

// Global build task
gulp.task('build', [
    'css',
    'js',
    'fonts',
    'images',
]);
gulp.task('build-iframe', [
    'iframe-css',
    'js',
]);


// Watch task
gulp.task('watch', function(){
    gulp.watch('*.js', ['js']);
    gulp.watch('*.css', ['css']);
});


// JS task
gulp.task('js', function() {
    return gulp.src([
            'bower_components/leaflet/dist/leaflet-src.js',
            'bower_components/leaflet.markercluster/dist/leaflet.markercluster.js',
            'onionmap.js'
        ])
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('./dist/js'))
});


// CSS task
gulp.task('css', function () {
    return gulp.src([
            'bower_components/bootstrap/dist/css/bootstrap.min.css',
            'bower_components/leaflet/dist/leaflet.css',
            'bower_components/leaflet.markercluster/dist/MarkerCluster.css',
            'bower_components/leaflet.markercluster/dist/MarkerCluster.Default.css',
            'onionmap.css'
        ])
        /*.pipe(rename({
            suffix: '.min'
        }))*/
        .pipe(cssmin())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('iframe-css', function () {
    return gulp.src([
            'bower_components/leaflet/dist/leaflet.css',
            'bower_components/leaflet.markercluster/dist/MarkerCluster.css',
            'bower_components/leaflet.markercluster/dist/MarkerCluster.Default.css',
            'onionmap.css'
        ])
        /*.pipe(rename({
            suffix: '.min'
        }))*/
        .pipe(cssmin())
        .pipe(concat('iframe.min.css'))
        .pipe(gulp.dest('./dist/css'))
});


gulp.task('fonts', function() {
    return gulp.src('bower_components/bootstrap/fonts/**.*')
        .pipe(gulp.dest('./dist/fonts'));
});


gulp.task('images', function() {
    return gulp.src('bower_components/leaflet/dist/images/**.*')
        .pipe(gulp.dest('./dist/css/images'));
});