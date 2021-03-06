"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var xml = require("xml2js");
var _ = require("lodash");
var Alert_1 = require("./Alert");
var Pg_1 = require("./Pg");
var Server = (function () {
    function Server() {
    }
    Server.bootstrap = function () {
        return new Server();
    };
    Server.prototype.parseNewAlert = function (a) {
        var alert = new Alert_1.default(a);
        return alert;
    };
    Server.prototype.parseXML = function () {
        var _this = this;
        var parser = new xml.Parser();
        var self = this;
        fs.readFile(__dirname + "/CAP.xml", function (err, data) {
            parser.parseString(data, function (err, result) {
                if (_.isObject(result) && _.has(result, "alert")) {
                    var xml_1 = _this.parseNewAlert(result.alert);
                }
            });
        });
    };
    Server.prototype.getDbStructure = function () {
        return new Promise(function (resolve, reject) {
            var pg = new Pg_1.default();
            var _d = pg.initPgClient(resolve, reject);
        });
    };
    Server.prototype.getDbStructureCompareWith = function () {
        return new Promise(function (resolve, reject) {
            var pg = new Pg_1.default();
            pg.config.database = 'lk-hol';
            var _d = pg.initPgClient(resolve, reject);
        });
    };
    return Server;
}());
exports.default = Server;
