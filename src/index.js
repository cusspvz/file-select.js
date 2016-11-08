const DEFAULT_OPTIONS = {
  multiple: false,
  maxFileSize: 20971520, // 20 Mb
}

export function fileSelect ( options ) {
  options = Object.assign({}, DEFAULT_OPTIONS, options)

  let fulfill, reject
  const promise = new Promise(function (ful, rej) {
    fulfill = ful
    reject = rej
  })

  function onChange ( e ) {
    var files = e.target.files;

    for( file of files ) {
      if (
        typeof file.size !== 'undefined' &&
        file.size > options.maxFileSize
      ) {
        alert( file.name + ' is too big, please select another' );

        if ( process.env.NODE_ENV === 'development' ) {
          console.warn(
            "If you need to select larger files, please change options.maxFileSize"
          )
        }
        return;
      }
    }

    fulfill( files )
  }

  let input = document.createElement('input');
	input.style.cssText = 'position:absolute;left:0;top:-999em;';
	input.type = 'file';
	input.multiple = options.multiple;

  input.addEventListener('change', onChange)
	addEventListener('focus', () => setTimeout(reject, 1000) )
	input.click()

  document.body.appendChild(input)

  return promise
}
