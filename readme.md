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
    primary: 'objectid' // defaults to objectid
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
