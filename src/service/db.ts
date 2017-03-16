"use strict";

import * as _ from "lodash";
import * as socketIo from "socket.io";
import * as http from "http";
import NodeApp from "../NodeApp";
import * as moment from "moment";
import Version from "../Version";
import * as rethinkdb from "rethinkdb";

class DbService {
    private host: string = '127.0.0.1';
    private port: number = 28015;
    public db: any;

    constructor() {
        this.init();
    }

    init() {
        this.db = rethinkdb;
        this.connect();
        //this.db = rethinkdb();
        //this.db('versions').tableCreate('tv_shows');
        //this.db.connect({host: this.host, port: this.port});
    }

    connect(){
        this.db.connect({"db":"versions", "host": this.host, "port": this.port}).then((conn: any) => {
            /*this.db.table('version').insert([
                new Version(1,'einsatzv1.ccommander.net'),
                new Version(2,'localhost')
            ]).run(conn, function(err, data){
                console.log(err);
            });*/
            this.db.table('version').run(conn,function(err: any, cursor: any){
                if (err) { throw err };
                cursor.toArray(function(err: any, result: any) {
                    if (err) { throw err };
                    console.log(JSON.stringify(result, null, 2));
                });
            });
        }).error((err: any) => {
//
        });
    }

}

export default DbService;