"use strict";
var NodeApp_1 = require("./NodeApp");
var Bootstrap = (function () {
    function Bootstrap() {
    }
    Bootstrap.bootstrap = function () {
        return new NodeApp_1.default();
    };
    return Bootstrap;
}());
var bootstrap = Bootstrap.bootstrap();
module.exports = bootstrap;
