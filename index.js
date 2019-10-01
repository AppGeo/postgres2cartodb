'use strict';
var fromPostgres = require('postgres2geojson');
var intoCartoDB = require('into-cartodb');
var pg = require('pg');
var ProgressBar = require('progress');

module.exports = convert;

function convert(config, callback) {
  config = config || {};
  config.postgres = config.postgres || {};
  config.cartodb = config.cartodb || {};
  var postgresCon = config.postgres.connection;
  var cartodbCon = config.cartodb.connection;
  var geometry = config.postgres.geometry;
  var postgresTable = config.postgres.table;
  var method = config.method || 'create';
  var options = {
    method: method
  };
  if (config.batchSize){
    options.batchSize = config.batchSize
  }
  if (config.direct) {
    options.direct = config.direct;
  }
  if (config.domain) {
    options.domain = config.domain;
  }
  if (config.subdomainless) {
    options.subdomainless = config.subdomainless;
  }
  var cartodbTable = config.cartodb.table || postgresTable;
  var bar;
  function tick(num) {
    if (bar) {
      bar.tick(num);
    }
  }
  if (config.progress) {
    pg.connect(postgresCon, function(err, client, done) {
      if (err) {
        return callback(err);
      }
      pg.end();
      client.query('select count(*) as c from "' + postgresTable + '";', function (err, result) {
        done();
        if (err) {
          return callback(err);
        }
        bar = new ProgressBar('[:bar] :percent :current/:total  ', {
          total: parseInt(result.rows[0].c, 10),
          width: 20
        });
        start();
      });
    });
  } else {
    start();
  }
  function start () {
    fromPostgres(postgresCon, postgresTable, geometry).on('error', function (e){
      console.log('from postgres round 1');
      callback(e);
    }).pipe(intoCartoDB(cartodbCon.user, cartodbCon.key, cartodbTable, options, callback)).on('inserted', tick);
  }
}
