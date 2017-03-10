"use strict";

import * as pg from "pg";
import * as _ from "lodash";
import PgTable from "./PgTable";
import PgColumn from "./PgColumn";

class Pg {
    private config: Object = {
        user: 'postgres', //env var: PGUSER
        database: 'rco', //env var: PGDATABASE
        password: 'igor1987', //env var: PGPASSWORD
        host: 'localhost', // Server hosting the postgres database
        port: 5432, //env var: PGPORT
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
    };
    private client: any = null;

    constructor() {
        //this.initPgClient();
    }

    /*public runClient(resolve: any, reject: any) {
        return this.initPgClient(callback);
    }*/

    public initPgClient(resolve: any, reject: any) {
        let self = this;
        let pgTableStructure: PgTable[] = [];
        this.client = new pg.Client(this.config);
        this.client.connect(function (err: any) {
            if (err) {throw err}
            let sql = 'SELECT DISTINCT ON("table_name") table_name,' +
                '(SELECT string_agg("column_name",\':\') FROM information_schema.columns AS "shm2" WHERE "shm2"."table_name" = "shm"."table_name") AS colums, '+
                '(SELECT string_agg("data_type",\':\') FROM information_schema.columns AS "shm2" WHERE "shm2"."table_name" = "shm"."table_name") AS colums_types '+
                'FROM information_schema.columns AS "shm" WHERE "shm"."table_schema" = \'public\'';

            self.client.query(sql,[],function(err: any, result: any){
                if (err) { throw err }
                if(_.isObject(result) && _.has(result,'rows') && _.isObject(result.rows)) {
                    _.forEach(result.rows,function(value: any){
                        if(_.isObject(value) && _.has(value,'table_name')){
                            let columns: any;
                            let columnsTypes: any;
                            let columnsObjects: PgColumn[] = [];
                            if(_.has(value,'colums') && _.has(value,'colums_types')){
                                columns = _.toString(value['colums']).split(':');
                                console.log(columns);
                                columnsTypes = _.toString(value['colums_types']).split(':');
                                _.forEach(columns,(v,k) => {
                                    let _cObj = new PgColumn(v,columnsTypes[k]);
                                    columnsObjects.push(_cObj);
                                })
                            }
                            pgTableStructure.push(new PgTable(value['table_name'],columnsObjects))
                        }
                    });
                    /*if(_.isFunction(callback)){
                        callback(pgTableStructure)
                    }*/
                    //console.log(result.rows);
                    //console.log(pgTableStructure);
                    resolve(pgTableStructure);
                }
            });
        });
        //return pgTableStructure;
    }
}

export default Pg;