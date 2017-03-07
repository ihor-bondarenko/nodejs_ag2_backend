"use strict";

var fs = require("fs");
var xml = require("xml2js");
var _ = require("lodash");
var Alert_1 = require("./Alert");
var Server = function () {
    function Server() {
        this.parseXML();
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
    return Server;
}();
var server = new Server();
module.exports = server;
//# sourceMappingURL=index.js.map
