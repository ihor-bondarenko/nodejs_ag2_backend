"use strict";

import * as _ from "lodash";
import * as express from "express";
import * as http from "http";
import * as path from "path";
import * as mongoose from "mongoose";
import SocketIOServer from "./service/socket.io";
import Server from "./Server";
import DbService from "./service/db";
import VersionsService from "./service/versions";

const PORT = 8124;

class NodeApp {
    public app: any;
    private io: SocketIOServer;
    public serverHttp: http.Server;
    public server: Server;
    public db: DbService;
    public versions: VersionsService;

    public static bootstrap() {
        return new NodeApp();
    }

    constructor() {
        this.app = express();
        this.serverHttp = http.createServer(this.app);
        this.io = new SocketIOServer(this);
        this.serverHttp.listen(PORT);
        this.server = new Server();
        this.db = new DbService();
        this.versions = new VersionsService(this);
    }
}

export default NodeApp;