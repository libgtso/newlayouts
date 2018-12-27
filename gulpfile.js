var gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  uglify = require("gulp-uglify"),
  csso = require("gulp-csso"),
  imagemin = require("gulp-imagemin"),
  pngquant = require("imagemin-pngquant"),
  sourcemaps = require("gulp-sourcemaps"),
  htmlmin = require("gulp-htmlmin"),
  nunjucks = require("gulp-nunjucks-html"),
  autoprefixer = require("gulp-autoprefixer");

var path = {
  src: {
    templates: "src/blocks",
    html: "src/pages/*.*html",
    njk: "src/blocks/**/*.njk",
    scss: "src/style/main.scss",
    js: "src/js/*.js",
    img: "./images/*.png"
  }
};

// gulp.task("sass", function() {
//   return gulp
//     .src("src/style/main.scss")
//     .pipe(sourcemaps.init())
//     .pipe(sass())
//     .pipe(autoprefixer(["last 2 versions", "> 1%"], { cascade: true }))
//     .pipe(csso())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest("./style"))
//     .pipe(browserSync.reload({ stream: true }));
// });

function wrapPipe(taskFn) {
  return function(done) {
    var onSuccess = function() {
      done();
    };
    var onError = function(err) {
      done(err);
    };
    var outStream = taskFn(onSuccess, onError);
    if (outStream && typeof outStream.on === "function") {
      outStream.on("end", onSuccess);
    }
  };
}

gulp.task(
  "sass",
  wrapPipe(function(success, error) {
    return (
      gulp
        .src(path.src.scss)
        .pipe(sourcemaps.init())
        .pipe(browserSync.reload({ stream: true }))
        .pipe(sass().on("error", error))
        .pipe(autoprefixer(["last 2 versions", "> 1%"], { cascade: true }))
        .pipe(sourcemaps.write())
        //.pipe(csso())
        .pipe(gulp.dest("./style"))
    );
  })
);

gulp.task("scripts", function() {
  return (
    gulp
      .src(path.src.js)
      .pipe(sourcemaps.init())
      //.pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("js"))
  );
});

gulp.task("html", function() {
  return (
    gulp
      .src(path.src.html)
      .pipe(
        nunjucks({
          searchPaths: [path.src.templates]
        })
      )
      //.pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest("./"))
  );
});

gulp.task("img", function() {
  return gulp.src(path.src.img).pipe(
    imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 7
    })
  );
  use: [pngquant()].pipe(gulp.dest("./images"));
});

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    notify: false,
    // tunnel: true,
    host: "localhost",
    port: 9000,
    logPrefix: "bkkb"
  });
});

gulp.task(
  "watch",
  ["browser-sync", "sass", "scripts", "img", "html"],
  function() {
    gulp.watch(path.src.scss, ["sass"]);
    gulp.watch("./*.html", browserSync.reload);
    gulp.watch(path.src.js, function(event, cb) {
      gulp.start("scripts", browserSync.reload);
    });
    gulp.watch(path.src.njk, function(event, cb) {
      gulp.start("html", browserSync.reload);
    });
  }
);
