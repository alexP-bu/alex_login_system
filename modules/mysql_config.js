import mysql from 'mysql'

const database = mysql.createPool({
    host: '172.19.0.2',
    port: '3306',
    user: 'username',
    password: 'password',
    database: 'socialnetworkdb',
    connectionLimit: 10,
});

export default database;