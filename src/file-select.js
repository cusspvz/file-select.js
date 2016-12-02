const DEFAULT_OPTIONS = {
  multiple: false,
  accept: false,
  maxFileSize: 20971520, // 20 Mb
  maxFilesSize: 20971520, // 20 Mb
}

function fileSelect ( options ) {
  return new Promise(function (ful, rej) {

    options = Object.assign({}, DEFAULT_OPTIONS, options)

    let input = document.createElement('input')
    input.style.cssText = 'position:absolute;left:0;top:-999em;'
    input.type = 'file'
    input.multiple = options.multiple

    if ( options.accept ) {
      input.accept = options.accept
    }

    function done ( err, value ) {
      input.remove()

      if ( err ) {
        return rej( err )
      }
      ful( value )
    }

    function onChange ( e ) {
      let filesSize = 0
      const files = e.target.files

      for( let file of files ) {
        if ( typeof file.size !== 'undefined' ) {
          filesSize += file.size

          if ( file.size > options.maxFileSize ) {
            alert( `${file.name} is too big, please select another` )

            if ( process.env.NODE_ENV === 'development' ) {
              console.warn(
                "If you need to select larger files," +
                " please change options.maxFileSize"
              )
            }
            return done( null, [] )
          }
        }

      }

      if ( filesSize > options.maxFilesSize ) {
        alert( `You've reached the maximum selected files size, please select less or smaller files` )
        return done( null, [] )
      }

      done( null, options.multiple ? files : files[0] )
    }

    input.addEventListener('change', onChange)
    addEventListener('focus', () => setTimeout(done, 1000) )
    input.click()

    document.body.appendChild(input)

  })
}

module.exports = fileSelect
