#!/usr/bin/env node
'use strict';
require('colors');
var fs = require('fs');
var convert = require('./');
var path = require('path');
var argv = require('yargs')
    .alias('p', 'postgres')
    .describe('p', 'postgres connection config, should be a path to a json file'.yellow)
    .default('p', null, '$POSTGRES_CONFIG')
    .alias('c', 'cartodb')
    .describe('c', 'cartodb connection config, should be a path to a json file'.yellow)
    .default('c', null, '$CARTODB_CONFIG')
    .alias('g', 'geometry')
    .describe('g', 'geometry field'.yellow)
    .default('g', 'shape')
    .alias('P', 'primary')
    .describe('P', 'primary key'.yellow)
    .default('P', 'objectid')
    .example('$0 -p ./postgres.json -c ./cartodb.json intable outtable', 'specify the files'.green)
    .example('$0 intable', 'use enviromental variables and the same table names'.green)
    .help('h', 'Show Help'.yellow)
   .alias('h', 'help')
    .argv;

var postgresConn = JSON.parse(fs.readFileSync(path.resolve(argv.postgres || process.env.POSTGRES_CONFIG)));
var cartodbConn = JSON.parse(fs.readFileSync(path.resolve(argv.cartodb || process.env.CARTODB_CONFIG)));

var geometry = argv.geometry;
var primary = argv.primary;

var inTable = argv._[0];
var outTable = argv._[1] || inTable;

var config = {
  postgres: {
    geometry: geometry,
    primary: primary,
    table: inTable,
    connection: postgresConn
  },
  cartodb: {
    connection: cartodbConn,
    table: outTable
  }
};
convert(config, function (err) {
  if (err) {
    console.log(err && err.stack || err);
    process.exit(1);
  }
  console.log('done');
  process.exit(0);
});
