gulp       = require 'gulp'
webpack    = require 'gulp-webpack'
coffee     = require 'gulp-coffee'
typescript = require 'gulp-tsc'
plumber    = require 'gulp-plumber'
webpack    = require 'gulp-webpack'

webpack_config =
  output:
    filename: 'playlistify-userscript.js'
  resolve:
    extensions: ["", ".js"]
  module:
    loaders: [
      test: /index.js$/
      loader: 'expose?playlistify'
    ]

gulp.task 'typescript', ->
    gulp.src(['src/**/*.ts'])
        .pipe(plumber())
        .pipe typescript()
        .pipe(gulp.dest('lib'))

gulp.task 'webpack', ->
  gulp.src(['lib/**/*.js'])
    .pipe(webpack(webpack_config))
    .pipe(gulp.dest('userscript'))

gulp.task 'watch', ['webpack'], ->
    gulp.watch 'src/**/*.ts', ['typescript']
    gulp.watch 'lib/**/*.js', ['webpack']

gulp.task 'default', ->
    gulp.run 'watch'
