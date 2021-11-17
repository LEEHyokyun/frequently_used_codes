const db = require('../config/database');
const Model = require('../models/model.js');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');

const {Sequelize} = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => {
    res.send('HELLO WORLD!');
    Model.findAll()
    .then(list => {
        
        console.log(list);
    })
    .catch(err => console.error(err));
});

router.use(bodyParser.json());

router.post('/add', (req, res) => {
    
    let {ID, PW} = req.body;

    if(!ID){
        alert('PLEASE CHECK ID');
    }
    if(!PW){
        alert('PLEASE CHECK PW');
    }

    Model.create({
        userID: ID,
        userPW: PW
    })
    .then((list)=>{
        console.log(list);
        res.redirect('/')
    })
    .catch((err)=>{console.error(err);})
})



module.exports = router;

