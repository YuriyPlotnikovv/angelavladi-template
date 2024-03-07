const gulp = require("gulp");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("node-sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const sync = require("browser-sync").create();
const htmlImport = require("gulp-html-import");
const concat = require("gulp-concat");
const bulk = require("gulp-sass-bulk-importer");
const clear = require("gulp-clean-css");

// HTML

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlImport("source/components/"))
    .pipe(gulp.dest("build"));
};

// Styles

const styles = () => {
  return gulp
    .src("source/styles/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(bulk())
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(clear({ level: 2 }))
    .pipe(concat("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/styles"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Scripts

const scripts = () => {
  return gulp
    .src("source/scripts/modules/*.js")
    .pipe(sourcemap.init())
    .pipe(uglify())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("script.min.js"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/scripts"))
    .pipe(sync.stream());
};

exports.scripts = scripts;

// Images

const optimizeImages = () => {
  return gulp
    .src("source/images/**/*.{png,jpg,svg}")
    .pipe(imagemin())
    .pipe(gulp.dest("build/images"));
};

exports.images = optimizeImages;

const copyImages = () => {
  return gulp
    .src("source/images/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/images"));
};

exports.images = copyImages;

// WebP

const createWebp = () => {
  return gulp
    .src("source/images/**/*.{jpg,png}")
    .pipe(webp({ quality: 80 }))
    .pipe(gulp.dest("build/images"));
};

exports.createWebp = createWebp;

// Sprite

const sprite = () => {
  return gulp
    .src("source/images/icons/*.svg")
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/images"));
};

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp
    .src(
      [
        "source/fonts/*.{woff2,woff}",
        "source/*.ico",
        "source/scripts/**/*.js",
        "source/styles/vendor/*.css",
      ],
      {
        base: "source",
      }
    )
    .pipe(gulp.dest("build"));
  done();
};

exports.copy = copy;

// Clean

const clean = () => {
  return del("build");
};

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Reload

const reload = (done) => {
  sync.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/styles/**/*.*", gulp.series(styles));
  gulp.watch("source/scripts/script.js", gulp.series(scripts));
  gulp.watch("source/**/*.html", gulp.series(html, reload));
};

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(html, styles, scripts, sprite, createWebp)
);

exports.build = build;

// Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(html, styles, scripts, sprite, createWebp),
  gulp.series(server, watcher)
);
