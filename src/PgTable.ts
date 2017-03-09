"use strict";

import * as _ from "lodash";
import PgColumn from "./PgColumn";

class PgTable {
    constructor(public name: string,public columns: PgColumn[]) {
        //
    }
}

export default PgTable;
