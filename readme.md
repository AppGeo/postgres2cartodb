postgres2cartodb
===

```js
convert({
  postgres: {
    connection : {
      database: 'foo',
      ...
    },
    table: 'myTable',
    geometry: 'shape', // defaults to shape
  },
  cartodb: {
    connection: {
      user: 'username',
      key: 'apikey'
    },
    table: 'myTable'
  }
}, function (err) {
  // done
})
```

```bash
Usage: postgres2cartodb inTable [outTable] [options]

Options:
  -p, --postgres  postgres connection config, should be a path to a json
                  file                          [default: $POSTGRES_CONFIG]
  -c, --cartodb   cartodb connection config, should be a path to a json
                  file                           [default: $CARTODB_CONFIG]
  -g, --geometry  geometry field                    [default: "shape"]
  -h, --help      Show Help                                  [boolean]

Examples:
  postgres2cartodb -p ./postgres.json -c ./cartodb.   specify the files
  json inTable outTable
  postgres2cartodb inTable                            use environmental variables and
                                            the same table names
  postgres2cartodb inTable outTable --no-g            use environmental variables and
                                            pass no geometry
```
