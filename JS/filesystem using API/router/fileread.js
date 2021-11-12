const fs = require('fs');

let path = './localstorage/created'

async function fileread(fileName){
    await fs.readFile(`${path}/${fileName}.txt`, 'utf-8', (err, data)=>{
        console.log(data)
    })
    
}

module.exports = fileread;