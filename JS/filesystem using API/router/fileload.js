const fs = require('fs');

let path = './localstorage/created'

async function fileload(fileName){
    fs.writeFile(`${path}/${fileName}.txt`, 'content', (err)=>{
        //console.log('what happened?');
    })
}

module.exports = fileload;