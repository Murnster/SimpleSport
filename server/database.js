const mysql = require('mysql');

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'murney',
    password: 'murney',
    database: 'simplesport'
});