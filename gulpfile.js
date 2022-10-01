import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
// import postcss from 'gulp-postcss';
// import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
// мои задачи
import rename from 'gulp-rename';
import svgstore from 'gulp-svgstore';
// import csso from 'postcss-csso';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import del from 'del';

// Styles
const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  // .pipe(postcss([
  // autoprefixer(),
  // csso()
  // ]))
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
  .pipe(browser.stream());
}

// HTML
const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
}

// Scripts
const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
}

// копирование шрифтов, иконки
const copy = (done) => {
  gulp.src([
  'source/fonts/*.{woff2,woff}',
  'source/*.ico',
  'source/*.webmanifest'
  ], {
  base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

// копирование картинок
const copyImages = (done) => {
  gulp.src('source/img/**/*.{png,jpg}')
  .pipe(gulp.dest('build/img'))
  done();
}

// оптимизация картинок
const optimizeImages = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
}

// Преобразование картинок в WebP
const webp = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(squoosh({webp: {}}))
  .pipe(gulp.dest('build/img'))
}

// обработка svg
const svg = () => {
  return gulp.src(['source/img/*.svg', '!source/img/icons/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));
}

// создание спрайта
const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
  .pipe(svgo())
  .pipe(svgstore({
  inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'));
}

// Очистка
const clean = () => {
  return del('build');
}

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Reload
const reload = (done) => {
  browser.reload();
  done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

// Default
export default gulp.series(
  // clean,
  // copy,
  // copyImages,
  // gulp.parallel(
  styles,
  // html,
  // scripts,
  // svg,
  sprite,
  // webp
  // ),
  // gulp.series(
  server,
  watcher
  // )
);

// Build
export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
  styles,
  html,
  scripts,
  svg,
  sprite,
  webp
  )
);
