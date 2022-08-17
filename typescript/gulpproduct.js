var gulpbuild = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");
var rename = require("gulp-rename");

var paths = {
    pages: ["src/*.html"],
    stylesheets: ["src/css/**/*.*"],
    assets: ["assets/*.png"],
    dts: ["src/*.d.ts"]
};
gulpbuild.task("copy-dts", function () {
    return gulpbuild.src(paths.dts).pipe(rename("function-link.d.ts")).pipe(gulpbuild.dest("build/js"));
});
// gulpbuild.task("copy-css", function () {
//     return gulpbuild.src(paths.stylesheets).pipe(gulpbuild.dest("dist/css"));
// });
// gulpbuild.task("copy-assets", function () {
//     return gulpbuild.src(paths.assets).pipe(gulpbuild.dest("dist/assets"));
// });
var typescript = require('gulp-typescript');

gulpbuild.task('typescript', function () {
    return gulpbuild.src('src/Portal.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript())
        .pipe(sourcemaps.write('./'))
        .pipe(rename("function-link.js"))
        .pipe(gulpbuild.dest('build/js'))
});

gulpbuild.task("default",gulpbuild.series("copy-dts", "typescript"))