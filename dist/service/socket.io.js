"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIo = require("socket.io");
var moment = require("moment");
var Version_1 = require("../Version");
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
            socket.on("get-versions-list", function () {
                var versions = [
                    new Version_1.default(1, 'einsatzv1.ccommander.net'),
                    new Version_1.default(2, 'localhost')
                ];
                socket.emit("new-versions-list", versions);
            });
        });
    };
    return SocketIOServer;
}());
exports.default = SocketIOServer;
