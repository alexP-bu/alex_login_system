import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import userRouter from './modules/userRouter.js';

dotenv.config({path: '../.env'});
const app = express();
const router = express.Router();

const PORT = 8080;

//database setup

//routes
app.use('/users', userRouter);
app.use('/', router);
app.all('*', (req, res) => {
   
});

//router
router.get('/', (req, res) => {
   app.use(express.static(path.resolve('./views/')));
   res.sendFile(path.resolve('./views/index.html'));
});

