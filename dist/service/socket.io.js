"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIo = require("socket.io");
var moment = require("moment");
var SocketIOServer = (function () {
    function SocketIOServer(nodeApp) {
        this.nodeApp = nodeApp;
        this.initIO();
    }
    SocketIOServer.prototype.initIO = function () {
        var self = this;
        this.io = socketIo(this.nodeApp.serverHttp);
        this.io.of("/clients").on("connection", function (socket) {
            socket.on('get-table-structure', function () {
                self.nodeApp.server.getDbStructure().then(function (data) {
                    self.nodeApp.server.mainTableStructure = data;
                    self.io.of('/clients').emit('new-table-structure', data);
                    var date = moment().format('MMMM Do YYYY, HH:mm:ss');
                    self.io.of('/clients').emit('last-structure-update', date);
                }).catch(function (err) {
                });
            });
        });
    };
    return SocketIOServer;
}());
exports.default = SocketIOServer;
