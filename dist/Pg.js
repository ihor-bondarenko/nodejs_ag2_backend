"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg = require("pg");
var _ = require("lodash");
var PgTable_1 = require("./PgTable");
var PgColumn_1 = require("./PgColumn");
var Pg = (function () {
    function Pg() {
        this.config = {
            user: 'postgres',
            database: 'drk-bw-dg2',
            password: 'igor1987',
            host: 'localhost',
            port: 5432,
            max: 10,
            idleTimeoutMillis: 30000
        };
        this.client = null;
    }
    Pg.prototype.initPgClient = function (resolve, reject) {
        var self = this;
        var pgTableStructure = [];
        this.client = new pg.Client(this.config);
        this.client.connect(function (err) {
            if (err) {
                throw err;
            }
            var sql = 'SELECT DISTINCT ON("table_name") table_name,' +
                '(SELECT string_agg("column_name",\':\') FROM information_schema.columns AS "shm2" WHERE "shm2"."table_name" = "shm"."table_name") AS colums, ' +
                '(SELECT string_agg("data_type",\':\') FROM information_schema.columns AS "shm2" WHERE "shm2"."table_name" = "shm"."table_name") AS colums_types ' +
                'FROM information_schema.columns AS "shm" WHERE "shm"."table_schema" = \'public\'';
            self.client.query(sql, [], function (err, result) {
                if (err) {
                    throw err;
                }
                if (_.isObject(result) && _.has(result, 'rows') && _.isObject(result.rows)) {
                    _.forEach(result.rows, function (value) {
                        if (_.isObject(value) && _.has(value, 'table_name')) {
                            var columns = void 0;
                            var columnsTypes_1;
                            var columnsObjects_1 = [];
                            if (_.has(value, 'colums') && _.has(value, 'colums_types')) {
                                columns = _.toString(value['colums']).split(':');
                                columnsTypes_1 = _.toString(value['colums_types']).split(':');
                                _.forEach(columns, function (v, k) {
                                    var _cObj = new PgColumn_1.default(v, columnsTypes_1[k]);
                                    columnsObjects_1.push(_cObj);
                                });
                            }
                            pgTableStructure.push(new PgTable_1.default(value['table_name'], columnsObjects_1));
                        }
                    });
                    resolve(pgTableStructure);
                }
            });
        });
    };
    return Pg;
}());
exports.default = Pg;
