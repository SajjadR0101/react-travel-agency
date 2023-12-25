const mysql = require('mysql');

const database = mysql.createConnection({
    host: 'fuji.liara.cloud',
    port: '33479',
    user: 'root',
    password: 'ikPmdWCnjH9ndoj3kI7BdNbx',
    database: 'travel_agency'
})

database.query('SET GLOBAL FOREIGN_KEY_CHECKS=0', (err) => {
    if (err) {
        console.log('error to change foreign key mode!');
    }
})

module.exports = database;
