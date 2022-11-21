const mysql = require('mysql2/promise');
const db = require('./config');

const getConnection = async () => {
    return mysql.createConnection(db);
}

exports.getConnection = getConnection;