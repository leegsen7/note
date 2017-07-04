var gulp = require('gulp');
var browserSync = require('browser-sync').create();
// Static server
gulp.task('browser-sync', function() {
    var files = ['*/**.html','*/**.js','*/**.css','*/**.png','*/**.jpg'];
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('default', ['browser-sync']); //定义默认任务
