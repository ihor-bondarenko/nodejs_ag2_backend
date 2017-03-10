"use strict";

var appCC = require("./dist/index");
var Promise = require('bluebird');
var net = require('net');
var http = require('http'),
    express = require('express'),
    app = express(),
    _ = require('lodash');

const PORT = 8124;
http.createServer(app).listen(PORT);
var mainTableStructure;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-XSRF-TOKEN");
    next();
});

app.get('/get-table-structure', function (req, res) {
    appCC.getDbStructure().then(function(data){
        mainTableStructure = data;
        return res.json(data);
    }).catch(function(err){
        return res.json(err);
    });
});

app.get('/compare-tables', function (req, res) {
    if(_.isObject(mainTableStructure)){
        appCC.getDbStructureCompareWith().then(function(data){
            var _objArr = [];
            var objects = _.isMatch(mainTableStructure,data);
            var allkeys = _.union(_.keys(mainTableStructure), _.keys(data));
            var difference = _.reduce(allkeys, function (result, key) {
                if ( !_.isEqual(mainTableStructure[key], data[key]) ) {
                   // console.log(_.differenceWith(mainTableStructure[key]['columns'], data[key]['columns'], _.isEqual));
                    //result[key] = {mainTableStructure: mainTableStructure[key], data: data[key]};
                    result[key] = {'name':mainTableStructure[key]['name'],'columns':_.differenceWith(mainTableStructure[key]['columns'], data[key]['columns'], _.isEqual)}
                }
                return result;
            }, {});

           console.log(difference);
            //var objects = _.isEqual(mainTableStructure, data);
            return res.json({'structure': data,'difference':_.toArray(difference)});
        }).catch(function(err){
            return res.json(err);
        });
    }else{
        return res.json({'error':'empty master database template'});
    }
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

