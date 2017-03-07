/// <reference path="_all.d.ts" />
"use strict";

import * as fs from "fs";
import * as express from "express";
import * as path from "path";
import * as xml from "xml2js";
import * as _ from "lodash";
import Alert from "./Alert";

/**
 * The server.
 *
 * @class Server
 */
class Server {
    public app: any;
    public alert: Alert;
    public static bootstrap(): Server {
        return new Server();
    }
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
        this.parseXML();
    }

    parseNewAlert(a: any): Alert {
       let alert = new Alert(a);

        return alert;
    }

    parseXML() {
        var parser = new xml.Parser();
        var self = this;
        fs.readFile(__dirname + "/CAP.xml", (err: Object, data: Object) => {
            parser.parseString(data, (err : any, result: {alert: Object}) => {
                //this.alert = result.alert;
                //console.log(result.alert);
                if (_.isObject(result) && _.has(result, "alert")) {
                    let xml = this.parseNewAlert(result.alert);
                   // console.log(xml.getAlertInfo());
                }
            });
        });
    }
}

var server = new Server();
export = server;