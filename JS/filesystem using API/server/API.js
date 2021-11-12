//PORT 3000
const express = require('express');
const app = express();
const path = require('path');

const getUrlParams = require('../router/getUrlParams.js')
const getFileName = require('../router/getFileName.js');
const fileLoad = require('../router/fileload.js');
const fileRead = require('../router/fileread.js');
const fileDelete = require('../router/filedelete.js')

let getAction = '';
let fileName = '';

app.use(express.static(path.join(__dirname, )))

app.get('/', (req, res)=>{
    res.send('THIS IS API SERVER!')
    //res.sendFile(path.join(__dirname, '../', 'index.html'));
    //res.send(data);
});

app.get('/api/:action/:filename', (req, res) => {
    res.send(getUrlParams(req, res));

    getAction = getUrlParams(req, res);
    fileName = getFileName(req, res);

    switch(getAction){
        case 'fileload': {
            fileLoad(fileName);
            //console.log(fileName);
        }
        case 'fileread' : {
            fileRead(fileName);
        }
        case 'filedelete' : {
            fileDelete(fileName);
        }
    };
});


module.exports = app;