/// <reference path="_all.d.ts" />
"use strict";

import * as express from "express";
import * as path from "path";
import * as xml from "xml2js";
import * as _ from "lodash";

/**
 * The server.
 *
 * @class Server
 */
class Server {

    public app: any;

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
        let xml = "";
        console.log(_.isObject(xml));
    }
}

var server = new Server();
export = server;