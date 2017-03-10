"use strict";

var appCC = require("./dist/index");
var Promise = require('bluebird');
var net = require('net');
var http = require('http'),
    express = require('express'),
    app = express();

const PORT = 8124;
http.createServer(app).listen(PORT);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-XSRF-TOKEN");
    next();
});

app.get('/get-table-structure', function (req, res) {
    appCC.getDbStructure().then(function(data){
        return res.json(data);
    }).catch(function(err){
        return res.json(err);
    });
});

app.get('/test', function (req, res) {
    appCC.getDbStructure().then(function(data){
        return res.json(data);
    }).catch(function(err){
        return res.json(err);
    });
});
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

