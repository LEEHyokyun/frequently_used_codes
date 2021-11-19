const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 5000;

var jwt = require('jsonwebtoken');

//body-parser for post request by form.
//must be the first step before bodyparser.
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('port', process.env.PORT || PORT);

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    //console.log(req.body);
    res.render(('main.html'));
})

//app.use - middleware
app.post('/index/:id', (req, res) => {
    //console.log(req.body);
    res.render('index.html');
})

app.use('/jwt', require('./router/routing.js'))

//app.listen(PORT, console.log(`SERVER RUNNING ON ${PORT}`));
app.listen(PORT, ()=>{
    console.log(`SERVER RUNNING ON ${PORT}`)
})