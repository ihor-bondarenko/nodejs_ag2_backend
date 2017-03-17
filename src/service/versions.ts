"use strict";

import * as _ from "lodash";
import NodeApp from "../NodeApp";
import Version from "../Version";

class VersionsService {
    public versions: Version[];
    private nodeApp: NodeApp;

    constructor(private nodeApp: NodeApp){
        console.log(nodeApp);
    }

    updateVersionData(){

    }

    getVersionsList(){

    }
}

export default VersionsService;



