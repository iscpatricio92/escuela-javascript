const fs= require('fs')

try{
    const file = process.argv[2]
    const content = fs.readFileSync(file).toString()

    const lines = content.split('\n').length
    console.log('Lineas=>', lines);
}
catch(err){
    console.error("error=>", err)
}