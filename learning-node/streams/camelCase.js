const { Transform } = require('stream')
const transformStream = new Transform({
    transform(chunk, encoding, cb) {
        this.push(camelize(chunk.toString()))
        cb()
    }
})
function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
      if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
      return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
  }

process.stdin.pipe(transformStream).pipe(process.stdout)