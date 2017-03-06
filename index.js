"use strict";
const _ = require("lodash");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        let xml = "";
        console.log(_.isObject(xml));
    }
}
var server = new Server();
module.exports = server;
