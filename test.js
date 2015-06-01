'use strict';
var convert = require('./');
// var fromPostgres = require('./fromPostgres');
// var fs = require('fs');
// var geojsonStream = require('geojson-stream');
convert({
  postgres: {
    connection: require('./postgress.auth.json'),
    geometry: 'shape',
    table: 'm072taxparstreetnumanno_point'
  },
  cartodb: {
    connection: require('./auth.json'),
    table: 'm072taxparstreetnumanno_point_next3'
  }
  }, function (a, b) {
  console.log('done', a && a.stack || a, b);
});
// fromPostgres(require('./postgress.auth.json'), 'm072taxparstreetnumanno_point', 'shape', 50)
// .pipe(geojsonStream.stringify())
// .pipe(fs.createWriteStream('end.geojson')).on('finish', function () {
//   console.log('done');
// });
