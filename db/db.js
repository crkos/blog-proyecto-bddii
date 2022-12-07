const mysql = require('mysql2/promise');
const db = require('./config');

const getConnection = async () => {
    return mysql.createConnection("mysql://evcwzmb8o4fpxega0au6:pscale_pw_AbDaYkwCzMg4I6Fu9sGzGr11XdPxeVnsaJjMnhnFRHj@us-east.connect.psdb.cloud/apps-moviles?ssl={\"rejectUnauthorized\":true}");
}

exports.getConnection = getConnection;