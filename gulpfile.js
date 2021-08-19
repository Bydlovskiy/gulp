const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const image = require('gulp-image');
const browserSync = require('browser-sync').create();
const del = require('del');


const paths = {
    images: {
        src: 'app/images/*.*',
        dest: 'build/images'
    },
    styles: {
        src: 'app/styles/**/*.css',
        dest: 'build/styles/css',

    },
    scripts: {
        src: 'app/js/main.js',
        dest: 'build/scripts'
    },
    jquery: {
        src: 'app/js/jquery-3.6.0.min.js',
        dest: 'build/scripts'
    },
    pug: {
        src: 'app/*.pug',
        dest: 'build/'
    },
    icons: {
        src: 'app/icons/**.svg',
        dest: 'build/icons'
    },
    fonts : {
        src: 'app/styles/fonts/*',
        dest: 'build/styles/fonts'
    }
};

function browser(done) {
    browserSync.init({
        server: {
            baseDir: './build'
        },
        port: 3000
    });
    done();
};

function browserReload(done) {
    browserSync.reload();
    done();
}
function fonts (){
    return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
}

function images() {
    return gulp.src(paths.images.src)
        .pipe(image())
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream())
}


function styles() {
    return gulp.src(paths.styles.src)
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream())
}

function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream())
}

function html() {
    return gulp.src(paths.pug.src)
        .pipe(pug())
        .pipe(gulp.dest(paths.pug.dest))
        .pipe(browserSync.stream())
}

function jquery() {
    return gulp.src(paths.jquery.src)
        .pipe(gulp.dest(paths.jquery.dest))
}

function icons() {
    return gulp.src(paths.icons.src)
    .pipe(gulp.dest(paths.icons.dest))
}

function watch() {
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch('app/**/*.pug', html);
    gulp.watch('./app/*.html', gulp.series(browserReload));
}

function clear() {
    return del(['build']);
}


const build = gulp.series(clear, gulp.parallel(fonts,styles,jquery, icons, images, scripts, html));

gulp.task('build', build);

gulp.task('default', gulp.parallel(watch, browser, build));