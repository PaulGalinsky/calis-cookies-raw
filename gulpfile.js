const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function style() {
	//find main scss file in src
	return gulp.src('src/sass/style.scss')
	//pass through sass compiler
		.pipe(sass().on('error', sass.logError))
	//save compiled css in dist folder
		.pipe(gulp.dest('dist/css'))
	//stream changes to all browsers with browsersync
		.pipe(browserSync.stream());
}

function copyHTML() {
	//find .html files in src
	return gulp.src('src/*.html')
	// copy them to distribution fodler
		.pipe(gulp.dest('dist'));
}

function copyJS() {
	//find .js files in src
	return gulp.src('src/js/**/*.js')
	// copy them to distribution fodler
		.pipe(gulp.dest('dist/js'));
}


function watch() {
	browserSync.init({
		server: {
			baseDir: './dist/'
		}
	});
	gulp.watch('src/sass/**/*.scss', style);
	gulp.watch('src/*.html', copyHTML);
	gulp.watch('src/*.html').on('change', browserSync.reload);
	gulp.watch('src/js/**/*.js', copyJS);
	gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
}

exports.copyHTML = copyHTML;
exports.copyJS = copyJS;
exports.style = style;
exports.watch = watch;




// const gulp = require('gulp');
// const sass = require('gulp-sass');

// // gulp.task - define tasks
// // gulp.src - point to files to use
// // gulp.dest - points to folder to output
// // gulp.watch - watch files and folders for changes

// gulp.task('copyHtml', function(done){
// 	gulp.src('src/*.html')
// 		.pipe(gulp.dest('dist'));
// 	done();
// });

// gulp.task('sass', function(done){
// 	gulp.src('src/sass/style.scss')
// 		.pipe(sass().on('error', sass.logError))
// 		.pipe(gulp.dest('dist/css'));
// 	done();
// });

// gulp.task('rawImage', function(done){
// 	gulp.src('src/img/*')
// 		.pipe(gulp.dest('dist/img'));
// 	done();
// });

// gulp.task('default', gulp.series('copyHtml', 'sass', 'rawImage'));

// gulp.task('watch', function(){
// 	gulp.watch('src/*.html', gulp.series('copyHtml'));
// 	gulp.watch('src/sass/*.scss', gulp.series('sass'));
// 	gulp.watch('src/img/*', gulp.series('rawImage'));
// });