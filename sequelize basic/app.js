const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database.js');

const app = express();
const PORT = 3300;

db.authenticate()
.then(()=> console.log('DATABASE CONNECTED SUCCESSFULLY'))
.catch(error => console.error('ERR', error));

//body-parser for post request by form.
//must be the first step before bodyparser.
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

app.set('port', process.env.PORT || PORT);

app.get('/', (req, res) => {
    res.render(('index.html'));
});

//express middleware
app.use('/tables', require('./routes/tables.js'));

app.listen(PORT, console.log(`SERVER RUNNING ${PORT}`));