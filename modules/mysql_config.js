import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config();
const database = mysql.createPool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    connectionLimit: process.env.CONNECTION_LIMIT
});

export default database;