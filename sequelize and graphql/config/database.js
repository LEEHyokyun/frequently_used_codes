const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'db_testDB2', 'postgres', 'tntjdrh30929', {
        host: 'localhost',
        dialect: 'postgres'
    }
);