import mysql from 'mysql'

const database = mysql.createPool({
    host: '172.22.0.2',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'socialnetworkdb',
    connectionLimit: 10,
});

export default database;