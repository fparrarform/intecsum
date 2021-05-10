import gulp from 'gulp'
import watch from "gulp-watch"
import plumber from "gulp-plumber"
import gulpsass from "gulp-sass"
import autoprefixer from "gulp-autoprefixer"
import cleanCss from "gulp-clean-css"
import sourcemaps from "gulp-sourcemaps"
import concat from "gulp-concat"
import jshint from "gulp-jshint"
import uglify from "gulp-uglify"
import imagemin from "gulp-imagemin"
import livereload from "gulp-livereload"
import notify from "gulp-notify"
import browserSync from 'browser-sync'

var onError = function(err){
    console.log("Se ha producido un error: ", err.message);
    this.emit("end");
}

browserSync.create()
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'localhost/webintecsum'
    });
});

gulp.task("sass", function(){
    return gulp.src("./sass/style.scss")
            .pipe(plumber({errorHandler:onError}))
            .pipe(sourcemaps.init())
            .pipe(gulpsass())
            .pipe(autoprefixer("last 2 versions"))
            .pipe(gulp.dest("."))
            .pipe(cleanCss({keepSpecialComments: 1}))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("."))
            // .pipe(livereload())
            .pipe(browserSync.stream({match: '**/*.css'}))
            .pipe(notify({message: "Sass task finalizada"}))
});


gulp.task("lint", function() {
    return gulp.src("./js/custom/**/*.js")
            .pipe(jshint())
});

gulp.task("javascript", function() {
    return gulp.src("./js/custom/**/*.js")
            .pipe(plumber({errorHandler:onError}))
            .pipe(concat("all.min.js"))
            .pipe(uglify())
            .pipe(gulp.dest("./js"))
            .pipe(livereload())
            .pipe(notify({message: "JavaScript task finalizada"}))
});

gulp.task("javalint", gulp.series('javascript', 'lint'))

gulp.task("imagemin", function(){
    return gulp.src("./images/raw/**/*.*")
            .pipe(plumber({errorHandler:onError}))
            .pipe(imagemin({
                progessive: true,
                interlaced: true
            }))
            .pipe(gulp.dest("./images/bin"))
            .pipe(livereload())
            .pipe(notify({message: "Imagemin task finalizada"}))
});

gulp.task("watch", function(){
       livereload.listen();
        gulp.watch("./sass/**/*.scss", gulp.series('sass'));
        gulp.watch("./js/custom/**/*.js", gulp.series("javascript"));
        gulp.watch("./images/raw/**/*.*", gulp.series("imagemin"));
    
    }
);

gulp.task("default", gulp.parallel('browser-sync', "sass", "javalint", "imagemin", "watch")
);

