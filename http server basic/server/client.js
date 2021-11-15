//PORT 8000
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const getUrlParams = require('../router/getUrlParams.js');
let getAction = '';

app.use(express.static(path.join(__dirname, )))

app.get('/', (req, res)=>{
    //res.send('THIS IS CLIENT SERVER!')
    res.sendFile(path.join(__dirname, '../index', '/client.html'));
});

app.get('/api/:action', (req, res) => {
    let getAction = getUrlParams(req, res);
    
    switch(getAction){
        case 'filesave': res.send(getAction);
        case 'filedelete' : res.send(getAction);
        case 'filesaveas' : res.send(getAction);
        default : res.send('해당하는 API가 존재하지 않습니다');
    };
});


module.exports = app;