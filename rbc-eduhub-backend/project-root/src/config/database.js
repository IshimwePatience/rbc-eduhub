const { Sequelize } = require('sequelize');

const sequelize =  new Sequelize('rbc-eduhubDB', 'postgres', 'Patience123@', {
host: 'localhost',
port: 5432,
dialect: 'postgres',
logging: false,
});

module.exports = sequelize;
