const Sequelize = require('sequelize');
const db = require('../config/database.js');

const tables = db.define('testDB2', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
    },
    userID: {
        type: Sequelize.STRING
    },
    userPW: {
        type: Sequelize.STRING
    }
});

module.exports = tables;