var fs = require('fs'),
    xml2js = require('xml2js'),
    _ = require('lodash');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/CAP.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        if(_.isObject(result) && _.has(result,'alert') && _.isObject(result['alert'])){
            if(_.has(result['alert'],'info') && _.isObject(result['alert']['info'])){
                _.forEach(result['alert']['info'],function(v,k){
                        if(_.isObject(v)){
                            _.forEach(v,function(v2,k2){
                                console.log(k2+ ' => ' +v2)
                            });
                        }
                });
            }
        }
    });
});