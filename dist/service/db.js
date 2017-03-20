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
            _this.connection = conn;
        }).error(function (err) {
        });
    };
    DbService.prototype.getVersionsList = function () {
    };
    return DbService;
}());
exports.default = DbService;
