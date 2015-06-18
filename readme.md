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
