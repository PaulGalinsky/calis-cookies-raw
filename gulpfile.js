const gulp = require('gulp');
const sass = require('gulp-sass');

// gulp.task - define tasks
// gulp.src - point to files to use
// gulp.dest - points to folder to output
// gulp.watch - watch files and folders for changes

gulp.task('copyHtml', function(done){
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
	done();
});

gulp.task('sass', function(done){
	gulp.src('src/sass/style.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'));
	done();
});

gulp.task('rawImage', function(done){
	gulp.src('src/img/*')
		.pipe(gulp.dest('dist/img'));
	done();
});

gulp.task('default', gulp.series('copyHtml', 'sass', 'rawImage'));

gulp.task('watch', function(){
	gulp.watch('src/*.html', gulp.series('copyHtml'));
	gulp.watch('src/sass/*.scss', gulp.series('sass'));
	gulp.watch('src/img/*', gulp.series('rawImage'));
});