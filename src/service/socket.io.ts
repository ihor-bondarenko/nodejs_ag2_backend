"use strict";

import * as _ from "lodash";
import * as socketIo from "socket.io";
import * as http from "http";
import NodeApp from "../NodeApp";
import * as moment from "moment";

class SocketIOServer {
    public io: any;

    constructor(public nodeApp: NodeApp) {
        this.initIO();
    }

    private initIO() {
        let self = this;
        this.io =  socketIo(this.nodeApp.serverHttp);
        //let nsp = this.io.of("/clients")
        this.io.of("/clients").on("connection", function(socket: any){
            socket.on('get-table-structure',function(){
                self.nodeApp.server.getDbStructure().then(function(data: any){
                    self.nodeApp.server.mainTableStructure = data;
                    self.io.of('/clients').emit('new-table-structure',data);
                    let date = moment().format('MMMM Do YYYY, HH:mm:ss');
                    self.io.of('/clients').emit('last-structure-update',date);
                    //return res.json(data);
                }).catch(function(err: any){
                    //return res.json(err);
                });
            });
        });
    }
}

export default SocketIOServer;