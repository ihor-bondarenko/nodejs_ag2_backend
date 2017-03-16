"use strict";

import * as _ from "lodash";

class Version {
    constructor(private id: string | number,public name: string, public updateState?: boolean) {
        this.updateState = false;
    }
}

export default Version;
