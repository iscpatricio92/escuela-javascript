const { read } = require('fs')
const { Duplex } = require('stream')
const duplexStream = new Duplex({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback()
    },
    read(size){ 
        if(this.currenCharCode>90){
            this.push(null)
            return
        }
        setTimeout(() => {
            this.push(String.fromCharCode(this.currenCharCode++))    
        }, 500);   
    }
})

duplexStream.currenCharCode= 65;

process.stdin.pipe(duplexStream).pipe(process.stdout)