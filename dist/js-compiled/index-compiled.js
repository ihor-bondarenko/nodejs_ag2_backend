"use strict";

var _ = require("lodash");
var Server = function () {
    function Server() {
        var xml = "";
        console.log(_.isObject(xml));
    }
    Server.bootstrap = function () {
        return new Server();
    };
    return Server;
}();
var server = new Server();
module.exports = server;
//# sourceMappingURL=index-compiled.js.map
