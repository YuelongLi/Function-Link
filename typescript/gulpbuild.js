var gulpbuild = require("gulp");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var sourcemaps = require("gulp-sourcemaps");
var buffer = require("vinyl-buffer");

var paths = {
    pages: ["src/*.html"],
    stylesheets: ["src/css/**/*.*"],
    assets: ["assets/*.png"]
};
gulpbuild.task("copy-html", function () {
    return gulpbuild.src(paths.pages).pipe(gulpbuild.dest("dist"));
});
gulpbuild.task("copy-css", function () {
    return gulpbuild.src(paths.stylesheets).pipe(gulpbuild.dest("dist/css"));
});
gulpbuild.task("copy-assets", function () {
    return gulpbuild.src(paths.assets).pipe(gulpbuild.dest("dist/assets"));
});
gulpbuild.task(
    "default",
    gulpbuild.series(gulpbuild.parallel("copy-html", "copy-css", "copy-assets"), function () {
        return browserify({
            basedir: ".",
            debug: true,
            entries: ["src/test.ts"],
            cache: {},
            packageCache: {},
        })
            .plugin(tsify, {extensions:['js','ts']})
            .bundle()
            .pipe(source("index.js"))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write("./"))
            .pipe(gulpbuild.dest("dist/js"));
    })
);