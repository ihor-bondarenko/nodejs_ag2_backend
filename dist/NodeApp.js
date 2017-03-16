"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http = require("http");
var socket_io_1 = require("./service/socket.io");
var Server_1 = require("./Server");
var db_1 = require("./service/db");
var PORT = 8124;
var NodeApp = (function () {
    function NodeApp() {
        this.app = express();
        this.serverHttp = http.createServer(this.app);
        this.io = new socket_io_1.default(this);
        this.serverHttp.listen(PORT);
        this.server = new Server_1.default();
        this.db = new db_1.default();
    }
    NodeApp.bootstrap = function () {
        return new NodeApp();
    };
    return NodeApp;
}());
exports.default = NodeApp;
