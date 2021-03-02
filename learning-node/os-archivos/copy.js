const fs = require('fs')

const copy = process.argv[2]
const to = process.argv[3]

fs.copyFile(copy, to, err => {
    if (err) {
        console.log(err)
    }
    console.log(`${copy} fue copiado como ${to}`)
})
