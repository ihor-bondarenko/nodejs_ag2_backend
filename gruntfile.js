module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        ts: {
            app: {
                files: [{
                    src: ["src/\*\*/\*.ts", "!src/.baseDir.ts", "!src/_all.d.ts"],
                    dest: "./dist/",
                    extension:"jsx"
                }],
                options: {
                    module: "commonjs",
                    noLib: true,
                    target: "es5",
                    sourceMap: false
                }
            }
        },
        babel: {
            options: {
                "sourceMap": true
            },
            dist: {
                files: [{
                    "expand": true,
                    "cwd": "dist/",
                    "src": ["**/*.js"],
                    "dest": "dist/"
                    //"ext": "-compiled.js"
                }]
            }
        },
        tslint: {
            options: {
                configuration: "tslint.json"
            },
            files: {
                src: ["src/\*\*/\*.ts"]
            }
        },
        watch: {
            ts: {
                files: ["js/src/\*\*/\*.ts", "src/\*\*/\*.ts"],
                tasks: ["ts", "tslint"]
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask("default", ["babel"]);

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");

    grunt.registerTask("default", [
        "ts",
        "tslint",
        "babel"
    ]);

};