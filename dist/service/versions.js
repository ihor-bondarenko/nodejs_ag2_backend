"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VersionsService = (function () {
    function VersionsService(nodeApp) {
        this.nodeApp = nodeApp;
    }
    VersionsService.prototype.updateVersionData = function () {
    };
    VersionsService.prototype.getList = function () {
        return this.nodeApp.db.db.table('version').run(this.nodeApp.db.connection).then(function (cursor) {
            return cursor.toArray();
        }).then(function (result) {
            return result;
        });
    };
    return VersionsService;
}());
exports.default = VersionsService;
