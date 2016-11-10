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

### Using a standalone release build

**HINT:** Check out newest releases [here](https://github.com/cusspvz/file-select.js/releases)!

```html
<script type="text/javascript" src="/path/to/file-select.min.js"></script>
<script type="text/javascript">

  window.onload = function () {
    fileSelect().then(console.log.bind(console))
  }

</script>
```

### JS ES-stage-0 a.k.a. ES-awesome
```js
import req from 'superagent'
import fileSelect from 'file-select'

async function uploadImages () {
  try {
    const image = await fileSelect({
      maxFileSize: 1024 * 1024 * 10,
      multiple: false,
      accept: 'image/*'
    })

    const res = await req.post('/').attach('image',image)
    alert( 'uploaded' )

  } catch ( err ) {
    alert( 'cancelled' )
  }
}
```

### JS ES5 / CommonJS
```js
var req = require( 'superagent' )
var fileSelect = require( 'file-select' )

function uploadImages () {
  return Promise.try(function () {
    return fileSelect({
      maxFileSize: 1024 * 1024 * 10,
      multiple: false,
      accept: 'image/*'
    })
  })
  .then(function ( images ) {
    return req.post('/').attach('image',image)
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

#### `options.accept`
`String | false`
String with mime types and file extensions separated by commas.

Examples:
- `.jpg,.jpeg`
- `image/jpeg,.jpeg,.jpg`
- `image/jpeg`
- `.pdf`
- `.mp3`

## LICENSE - POL-v1

[Private-Open License v1](https://raw.githubusercontent.com/cusspvz/pol/master/POL-1.0.md)
