"use strict";

import NodeApp from "./NodeApp";

class Bootstrap {
    constructor() {
        //
    }

    public static bootstrap() {
        return new NodeApp();
    }
}

let bootstrap = Bootstrap.bootstrap();

export = bootstrap;