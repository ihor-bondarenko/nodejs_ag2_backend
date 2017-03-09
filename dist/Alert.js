"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var AlertObjInfoParameter = (function () {
    function AlertObjInfoParameter() {
    }
    return AlertObjInfoParameter;
}());
var AlertObjInfo = (function () {
    function AlertObjInfo(category, event, severity, certainty, senderName, headline, description, web, parameter) {
        this.category = category;
        this.event = event;
        this.severity = severity;
        this.certainty = certainty;
        this.senderName = senderName;
        this.headline = headline;
        this.description = description;
        this.web = web;
        this.parameter = parameter;
    }
    return AlertObjInfo;
}());
var AlertObj = (function () {
    function AlertObj(identifier, sender, sent, status, msgType, scope, incidents, info) {
        this.identifier = identifier;
        this.sender = sender;
        this.sent = sent;
        this.status = status;
        this.msgType = msgType;
        this.scope = scope;
        this.incidents = incidents;
        this.info = info;
        var _i = info[0];
        _.forEach(info, function (v, k) {
            console.log(v);
        });
    }
    return AlertObj;
}());
var Alert = (function () {
    function Alert(alert) {
        this.alert = alert;
        this.alertObj = new AlertObj(alert.identifier, alert.sender, alert.sent, alert.status, alert.msgType, alert.scope, alert.incidents, alert.info);
    }
    Alert.prototype.getAlertInfo = function () {
        return this.alertObj.info;
    };
    Alert.prototype.getAlert = function () {
        return this.alertObj;
    };
    return Alert;
}());
exports.default = Alert;
