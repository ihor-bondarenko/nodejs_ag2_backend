"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rethinkdb = require("rethinkdb");
var DbService = (function () {
    function DbService() {
        this.host = '127.0.0.1';
        this.port = 28015;
        this.init();
    }
    DbService.prototype.init = function () {
        this.db = rethinkdb;
        this.connect();
    };
    DbService.prototype.connect = function () {
        var _this = this;
        this.db.connect({ "db": "versions", "host": this.host, "port": this.port }).then(function (conn) {
            _this.db.table('version').run(conn, function (err, cursor) {
                if (err) {
                    throw err;
                }
                ;
                cursor.toArray(function (err, result) {
                    if (err) {
                        throw err;
                    }
                    ;
                    console.log(JSON.stringify(result, null, 2));
                });
            });
        }).error(function (err) {
        });
    };
    return DbService;
}());
exports.default = DbService;
