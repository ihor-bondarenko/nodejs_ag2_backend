"use strict";

import * as _ from "lodash";

class AlertObjInfoParameter {
    constructor() {
        //
    }
}

class AlertObjInfo {
    constructor(
        public category: string[],
        public event: string[],
        public severity: string[],
        public certainty: string[],
        public senderName: string[],
        public headline: string[],
        public description: string[],
        public web: string[],
        public parameter: AlertObjInfoParameter[]
    ) {
        //console.log(this.parameter);
    }
}

class AlertObj {
    constructor(
        public identifier: string[],
        public sender: string[],
        public sent: string[],
        public status: string[],
        public msgType: string[],
        public scope: string[],
        public incidents: string[],
        public info: AlertObjInfo[]
    ) {
        let _i: AlertObjInfo = info[0];
        _.forEach(info, (v, k) => {
            console.log(v);
        });
    }
}

class Alert {
    private alertObj: AlertObj;

    constructor(public alert: AlertObj) {
        this.alertObj = new AlertObj(
            alert.identifier,
            alert.sender,
            alert.sent,
            alert.status,
            alert.msgType,
            alert.scope,
            alert.incidents,
            alert.info
        );
        //console.log(alertObj);
    }

    getAlertInfo(): AlertObjInfo[] {
        return this.alertObj.info;
    }

    getAlert(): AlertObj {
        return this.alertObj;
    }
}

export default Alert;