const fs = require('fs');

let path = './localstorage/created'

async function filedelete(fileName){
    fs.unlink(`${path}/${fileName}.txt`, (err)=>{
        //console.log('what happened?');
    })
}

module.exports = filedelete;