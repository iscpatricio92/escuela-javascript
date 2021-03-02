const { Writable } = require('stream')

const writableStream = new Writable({
    write(chunk, encoding, cb) {
        console.log(chunk.toString());
    }
})

process.stdin.pipe(writableStream)