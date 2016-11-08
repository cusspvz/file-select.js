# file-select

prompt user for selecting files. +promises, -forms

![prompt](http://2.bp.blogspot.com/-lEZIGdCwdkg/TWfp3hvdzDI/AAAAAAAADo8/YCMq_gCqqvA/s640/Choose+file+to+upload.png)


## What is this?

This allows the developer to ask their app/website users for files without
creating a form and a file input element.


## Installation

```bash
npm i --save file-select
```

## Usage

### JS ES-stage-0 a.k.a. ES-awesome
```js
import req from './req'
import fileSelect from 'file-select'

async function uploadImages () {
  try {
    const images = await fileSelect({ maxFileSize: 1024 * 1024 * 10 })

    const res = await req.post('/', { images })
    alert( 'uploaded' )

  } catch ( err ) {
    alert( 'cancelled' )
  }
}
```

### JS ES5 / CommonJS
```js
var req = require( './req' )
var fileSelect = require( 'file-select' )

function uploadImages () {
  return Promise.try(function () {
    return fileSelect({ maxFileSize: 1024 * 1024 * 10 })
  })
  .then(function ( images ) {
    return req.post('/', { images })
  })
  .then(function ( res ) {
    alert( 'uploaded' )
  })
  .catch(function ( err ) {
    alert( 'cancelled' )
  })
}
```


## API

### `fileSelect`

#### `options`
`Object`
Object with options.

#### `options.multiple`
`boolean`
Allows multiple files selection.

#### `options.maxFileSize`
`Number`
Limits select size PER FILE.


## LICENSE - POL-v1

[Private-Open License v1](https://raw.githubusercontent.com/cusspvz/pol/master/POL-1.0.md)
