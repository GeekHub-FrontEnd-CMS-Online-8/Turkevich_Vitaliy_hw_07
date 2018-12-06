var gulp        = require('gulp'),
	browserSync = require('browser-sync').create(),
    scss        = require('gulp-scss'),
	imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    cache    = require('gulp-cache');

gulp.task("html", function () {
    return gulp.src("src/**/*.html")
        .pipe(gulp.dest("build"))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scss', function () {
	return gulp.src('src/scss/**/*.scss')
		.pipe(scss())
		.pipe(gulp.dest('build/css'))
		//.on('error', scss.logError) // ???
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('clear', function () {
	return cache.clearAll()
});

gulp.task('img', function () {
	return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
		.pipe(gulp.dest('build/img'))
		.pipe(browserSync.reload({stream: true}))

});

gulp.task("watch", [ 'scss', "html", 'img'], function () {
	browserSync.init({
		server: "build",
		notify: false,
		ui: {
			port: 3000
		}
    });
    gulp.watch('src/scss/**/*.scss', ["scss"]);
    gulp.watch('src/*.html' , ["html"]);
	gulp.watch('src/img/**/*', ["img"]);
});
