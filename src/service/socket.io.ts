"use strict";

import * as _ from "lodash";
import * as socketIo from "socket.io";
import * as http from "http";
import NodeApp from "../NodeApp";
import * as moment from "moment";
import Version from "../Version";

class SocketIOServer {
    public io: any;
    public versions: Version[] = [];

    constructor(public nodeApp: NodeApp) {
        this.versions = [
            new Version(1,'einsatzv1.ccommander.net'),
            new Version(2,'localhost')
        ];
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
            socket.on("get-versions-list",function(){
                socket.emit("new-versions-list",self.versions);
            });
            socket.on("update-version-data",function(version: any){
                let objIndex = _.findIndex(self.versions,{id: version.id});
                if(objIndex !== -1){
                    self.versions[objIndex] =  version;
                    socket.broadcast.emit("updated-version-data",version);
                }
            });
        });
    }
}

export default SocketIOServer;