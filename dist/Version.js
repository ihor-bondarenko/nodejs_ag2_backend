"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Version = (function () {
    function Version(id, name, updateState) {
        this.id = id;
        this.name = name;
        this.updateState = updateState;
        this.updateState = false;
    }
    return Version;
}());
exports.default = Version;
