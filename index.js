"use strict";

//var appCC = require("./dist/index");
var Promise = require('bluebird');
var http = require('http'),
    express = require('express'),
    app = express(),
    _ = require('lodash'),
    sio = require('socket.io'),
    session = require("express-session");
var NodeApp = require("./dist/Bootstrap");
var mainTableStructure;

NodeApp.app.use(session({
    secret: "913aef12708e5c8fb060e6653ba160fd",
    resave: true,
    saveUninitialized: true
}));

NodeApp.app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-XSRF-TOKEN");
    next();
});

/*NodeApp.app.get('/get-table-structure', function (req, res) {
    appCC.getDbStructure().then(function(data){
        mainTableStructure = data;
        return res.json(data);
    }).catch(function(err){
        return res.json(err);
    });
});

NodeApp.app.get('/compare-tables', function (req, res) {
    if(_.isObject(mainTableStructure)){
        appCC.getDbStructureCompareWith().then(function(data){
            var _objArr = [];
            var objects = _.isMatch(mainTableStructure,data);
            var allkeys = _.union(_.keys(mainTableStructure), _.keys(data));
            var difference = _.reduce(allkeys, function (result, key) {
                if ( !_.isEqual(mainTableStructure[key], data[key]) ) {
                    result[key] = {'name':mainTableStructure[key]['name'],'columns':_.differenceWith(mainTableStructure[key]['columns'], data[key]['columns'], _.isEqual)}
                }
                return result;
            }, {});
            return res.json({'structure': data,'difference':_.toArray(difference)});
        }).catch(function(err){
            return res.json(err);
        });
    }else{
        return res.json({'error':'empty master database template'});
    }
});*/

//var socketIO = sio(server);
//NodeApp.server.listen(PORT);
/*var server = net.createServer(function(conn) {
    console.log('connected');
    conn.on('data', function (data) {
        console.log(data);
        conn.write('Repeating: ' + data);
    });
    conn.on('close', function() {
        console.log('client closed connection');
    });
}).listen(PORT);
server.on('listening', function() {
    console.log('listening on ' + PORT);
});
server.on('error', function(err){
    if (err.code == 'EADDRINUSE') {
        console.warn('Address in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(PORT);
        }, 1000);
    }
    else {
        console.error(err);
    }
});*/

