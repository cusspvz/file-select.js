const DEFAULT_OPTIONS = {
  multiple: false,
  maxFileSize: 20971520, // 20 Mb
  maxFilesSize: 20971520, // 20 Mb
}

export function fileSelect ( options ) {
  options = Object.assign({}, DEFAULT_OPTIONS, options)

  let fulfill, reject
  const promise = new Promise(function (ful, rej) {
    fulfill = ful
    reject = rej
  })

  function onChange ( e ) {
    let filesSize = 0
    const files = e.target.files

    for( file of files ) {
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
          return
        }
      }

    }

    if ( filesSize > maxFilesSize ) {
      alert( `You've reached the maximum selected files size, please select less or smaller files` )
      return
    }

    fulfill( options.multiple ? files : files[0] )
  }

  let input = document.createElement('input')
	input.style.cssText = 'position:absolute;left:0;top:-999em;'
	input.type = 'file'
	input.multiple = options.multiple

  input.addEventListener('change', onChange)
	addEventListener('focus', () => setTimeout(reject, 1000) )
	input.click()

  document.body.appendChild(input)

  return promise
}
