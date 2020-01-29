var gulp         = require ('gulp');
var notify       = require ('gulp-notify');
var plumber      = require ('gulp-plumber');
var svgo         = require ('gulp-svgo');
var iconfont     = require('gulp-iconfont');
var svgFill      = require('gulp-svg-fill');
var gulpIf       = require('gulp-if');
var argv         = require('yargs').argv;
var shell        = require('gulp-shell');
var rename       = require("gulp-regex-rename");
var del          = require('del');
var cheerio      = require('gulp-cheerio');
var svgSprite    = require('gulp-svg-sprite');

var svgoConfig   = require('./svgo-config.json');

var pdf    = argv.pdf;
var png    = argv.png;

if (png) {
  var fileType = 'png'
} else {
  var fileType = 'pdf';
}

var font   = argv.font;

const fontConfig = {
  prependUnicode: false, 
  fontName: 'icons', 
  formats: ['ttf', 'eot', 'woff'], 
  normalize: true,
  fontHeight: 1000
};

var colorBool = (argv.c === undefined) ? false : true;
var color     = argv.c || '000000';

const colorConfig = {
  colors: {
    'colored': '#' + color
  }
}

var resizeBool = (argv.r === undefined) ? false : true;
var reSize     = argv.r || '0px';

var paddingBool = (argv.p === undefined) ? false : true;
var padding     = argv.p || '0px';

var svgSpConfig = {
  shape: {
      spacing: { 
          padding: padding + 'px',
          "box": "padding"
      },
      transform: ['none'],

      dest: "./"
  }
}

const src = 'src/**/*';
const distBase = 'dist';

if (font) {
  var dist= distBase + '/font/'
} else if (pdf) {
  var dist = distBase + '/pdf/'
} else if (png) {
  var dist = distBase + '/png/'
} else {
  var dist = distBase + '/svg/'
}


function icons() {
  return gulp.src(src)
    .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))

    .pipe( svgo( svgoConfig ))

    .pipe( gulpIf( colorBool, svgFill( colorConfig )))
    .pipe( gulpIf( colorBool, rename( /\_colored/, '' ) ))

    .pipe( gulpIf( paddingBool, svgSprite(svgSpConfig) ))
    .pipe( gulpIf( resizeBool, cheerio({
      run: function ($) {
          $('svg').attr('width',  reSize + 'px');
          $('svg').attr('height',  reSize + 'px');
      },
      parserOptions: { xmlMode: true }
    })))

    .pipe( gulpIf( font, iconfont( fontConfig )))

    .pipe(gulp.dest( dist ));
};

function info() {
  return gulp.src('package.json')
  .pipe(notify( 'icons generated' ));
};

if (pdf || png) {
  function svgTransform() {
    return gulp.src(dist + '*.svg')
      .pipe( shell(['inkscape <%= file.path %> --export-' + fileType + '=<%= file.path %>.' + fileType]) )
  }

  function removeSVG() {
    return gulp.src(dist + '*.' + fileType)
      .pipe( rename( /\.svg/, '' ) )
      .pipe( gulp.dest( dist ) );
  }

  const clean = () => del([ dist + '*.svg*' ]);

  gulp.task('default', gulp.series(icons, svgTransform, removeSVG, clean, info));

} else {

  gulp.task('default', gulp.series(icons, info));
  
}