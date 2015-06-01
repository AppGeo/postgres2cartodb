'use strict';
var fromPostgres = require('postgres2geojson');
var cartodbTools = require('cartodb-tools');
var uploader = require('cartodb-uploader');

module.exports = convert;

function convert(config, callback){
  config = config || {};
  config.postgres = config.postgres || {};
  config.cartodb = config.cartodb || {};
  var postgresCon = config.postgres.connection;
  var cartodbCon = config.cartodb.connection;
  var geometry = config.postgres.geometry || 'shape';
  var postgresTable = config.postgres.table;
  var cartodbTable = config.cartodb.table || postgresTable;
  var primary = config.postgres.primary || 'objectid';
  fromPostgres(postgresCon, postgresTable, geometry, primary, 0, 50).on('error', callback)
    .pipe(uploader.geojson(cartodbCon, cartodbTable, function (err) {
      if (err) {
        return callback(err);
      }
      fromPostgres(postgresCon, postgresTable, geometry, primary, 50).on('error', callback)
        .pipe(cartodbTools(cartodbCon.user, cartodbCon.key).createWriteStream(cartodbTable))
        .on('error', function (e) {
          callback(e);
        })
        .on('end', function () {
          callback();
        });
    }));
}
