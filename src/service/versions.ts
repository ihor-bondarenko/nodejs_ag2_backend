"use strict";

import * as _ from "lodash";
import NodeApp from "../NodeApp";
import Version from "../Version";

class VersionsService {
    public versions: Version[];

    constructor(private nodeApp: NodeApp){
        //console.log(nodeApp);
    }

    updateVersionData(){
        //
    }

    getList(){
        return this.nodeApp.db.db.table('version').run(this.nodeApp.db.connection).then((cursor: any) => {
            return cursor.toArray();
        }).then((result) => {
            return result;
           //return result;
        });
    }
}

export default VersionsService;



