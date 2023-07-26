const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize({
    host: "localhost",
    database: "to_do_list_db",
    port: 5432,
    username: "postgres",
    password: "0741",
    dialect: "postgres",
});

module.exports = {
    db 
};