import express from 'express'
import path from 'path'
import mysql from 'mysql'
import dbRoutes from './modules/dbRoutes.js';

const app = express();
const router = express.Router();
const PORT = 8080;

//database setup


app.use('/', router);
app.use(express.static(path.resolve('./views/')));

router.get('/', (req, res) => {
   res.sendFile(path.resolve('./views/index.html'));
});

