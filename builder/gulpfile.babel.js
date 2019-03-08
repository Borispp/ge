var babel, bower, config, consoleErorr, fs, g, gulp, gulpLoadPlugins, pngcrush, svgSprite, uglify, yaml, es2015Preset;

fs = require('fs');
yaml = require('js-yaml');
pngcrush = require('imagemin-pngcrush');
// svgSprite = require('gulp-svg-sprites');
gulp = require('gulp');
bower = require('gulp-bower');
babel = require('gulp-babel');
gulpLoadPlugins = require('gulp-load-plugins');
uglify = require('gulp-uglifyjs');
// iconfont = require('gulp-iconfont');
// runTimestamp = Math.round(Date.now()/1000);

g = gulpLoadPlugins();

config = yaml.load(fs.readFileSync("config.yml", "utf8"));

consoleErorr = function(err) {
  g.util.beep();
  console.log(err.message);
};

gulp.task('bower', function() {
  return bower().pipe(gulp.dest(config.paths.built.libs.path));
});

// gulp.task('iconfont', function(){
//   return gulp.src([config.paths.src.iconfont])
//     .pipe(iconfont({
//       fontName: 'iconfont', // required
//       prependUnicode: true, // recommended option
//       formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
//       normalize: true,
//       timestamp: runTimestamp // recommended to get consistent builds when watching files
//     }))
//       .on('glyphs', function(glyphs, options) {
//         // CSS templating, e.g.
//         console.log(glyphs, options);
//       })
//     .pipe(gulp.dest(config.paths.built.iconfont.font));
// });

gulp.task('sprite', function() {
  var spriteData;
  spriteData = gulp.src(config.paths.src.sprites.images.all).pipe(g.plumber({
    errorHandler: consoleErorr
  })).pipe(g.spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.styl',
    padding: 2,
    cssFormat: 'stylus',
    algorithm: 'binary-tree',
    cssTemplate: 'stylus.template.mustache',
    cssVarMap: function(sprite) {
      sprite.name = 's-' + sprite.name;
    }
  }));
  spriteData.img.pipe(gulp.dest(config.paths.built.images.design.path));
  spriteData.css.pipe(gulp.dest(config.paths.src.sprites.style));
});

// gulp.task('spritesSvg', function() {
//   return gulp.src(config.paths.src.images.svg.path).pipe(svgSprite({
//     cssFile: config.paths.built.styles.svg.path,
//     svgPath: config.paths.built.images.svg.sprite.path
//   })).pipe(gulp.dest(config.paths.built.images.svg.path));
// });

// gulp.task('coffee', function() {
//   return gulp.src(config.paths.src.scripts.all).pipe(g.plumber({
//     errorHandler: consoleErorr
//   })).pipe(g.coffee({
//     bare: true
//   })).pipe(gulp.dest(config.paths.built.scripts.path));
// });

gulp.task('babel', function() {
  return gulp.src(config.paths.src.scripts.all).pipe(g.plumber({
    errorHandler: consoleErorr
  }))
	.pipe(babel({
			presets: ['es2015']
		}))
	.pipe(gulp.dest(config.paths.built.scripts.path));
});


gulp.task('scripts', function() {
  return gulp.src([config.paths.src.scripts.json, config.paths.src.scripts.html]).pipe(g.plumber({
    errorHandler: consoleErorr
  })).pipe(gulp.dest(config.paths.built.scripts.path));
});

gulp.task('vendor', function() {
  return gulp.src(config.paths.src.scripts.vendor.all).pipe(gulp.dest(config.paths.built.scripts.vendor.path));
});

gulp.task('stylus', function() {
  return gulp.src(config.paths.src.styles.main).pipe(g.plumber({
    errorHandler: consoleErorr
  })).pipe(g.stylus()).pipe(gulp.dest(config.paths.built.styles.path));
});

gulp.task('images', function() {
  return gulp.src([config.paths.src.images.all, '!' + config.paths.src.sprites.images.all]).pipe(gulp.dest(config.paths.built.images.path));
});

gulp.task('jade', function() {
  return gulp.src(config.paths.src.templates.pages.all).pipe(g.plumber({
    errorHandler: consoleErorr
  })).pipe(g.jade({
    pretty: true
  })).pipe(gulp.dest(config.paths.built.path));
});

gulp.task('autoprefixer', function() {
  return gulp.src(config.paths.built.styles.all).pipe(g.autoprefixer()).pipe(gulp.dest(config.paths.built.styles.path));
});

gulp.task('scripts:min', function() {
  return gulp.src(config.paths.built.scripts.all).pipe(g.plumber({
    errorHandler: consoleErorr
  })).pipe(g.uglify()).pipe(gulp.dest(config.paths.built.scripts.path));
});

gulp.task('images:min', function() {
  return gulp.src(config.paths.built.images.all).pipe(g.plumber({
    errorHandler: consoleErorr
  })).pipe(g.imagemin({
    progressive: true,
    svgoPlugins: [
      {
        removeViewBox: false
      }
    ],
    use: [pngcrush()]
  })).pipe(gulp.dest(config.paths.built.images.path));
});

gulp.task('styles:min', function() {
  return gulp.src(config.paths.built.styles.all).pipe(g.plumber({
    errorHandler: consoleErorr
  })).pipe(g.minifyCss()).pipe(gulp.dest(config.paths.built.styles.path));
});

gulp.task('watch', function() {
  // gulp.watch(config.paths.src.scripts.all, ['coffee']);
  gulp.watch(config.paths.src.scripts.all, ['babel']);
  gulp.watch(config.paths.src.styles.all, ['stylus']);
  gulp.watch(config.paths.src.images.all, ['images']);
  gulp.watch(config.paths.src.sprites.images.all, ['sprite']);
  gulp.watch(config.paths.src.templates.all, ['jade']);
});

gulp.task('uglify', function() {
  gulp.src('../built/assets/scripts/**.js').pipe(uglify('app.min.js', {
    outSourceMap: true
  })).pipe(gulp.dest('../built/assets/scripts/'));
});

gulp.task('concat', function() {
  return gulp.src('../built/assets/scripts/**/*.js').pipe(concat('all.js')).pipe(gulp.dest('../built/assets/scripts/'));
});

gulp.task('default', ['bower', 'sprite', 'stylus', 'images', 'babel', 'jade', 'scripts']);

gulp.task('dev', ['default', 'watch']);

gulp.task('minify', ['scripts:min', 'styles:min', 'images:min']);

gulp.task('prod', ['default', 'autoprefixer'], function() {
  return gulp.start('minify');
});
