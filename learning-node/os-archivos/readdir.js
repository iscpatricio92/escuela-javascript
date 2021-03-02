const fs= require('fs')
const files = fs.readdir(__dirname,(err,files)=>{
    if(err){
        return console.err(err)
    }
     console.log(files);
})