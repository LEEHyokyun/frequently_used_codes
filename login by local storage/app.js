//const DB = require('../DB/db.js')

const express = require('express');
const app = express();
const path = require('path');
const PORT = 5000;

//app.use("/static", express.static(__dirname, '/src'));
//app.use(express.static('./static/'));

app.set('port', process.env.PORT || PORT);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './main.html'));
})

app.use('/index/:id', (req, res) => {
    const userName = req.params.id;
    res.sendFile(path.join(__dirname, './index.html'));
})

//app.listen(PORT, console.log(`SERVER RUNNING ON ${PORT}`));

app.listen(PORT, ()=>{
    console.log(`SERVER RUNNING ON ${PORT}`)
})






