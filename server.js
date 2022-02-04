import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import userRouter from './modules/userRouter.js';
import HTTPStatus from './modules/HTTPStatus.js';
import Response from './modules/Response.js';

dotenv.config({path: '../.env'});
const app = express();
const router = express.Router();

const PORT = 8080;

//database setup

//routes
app.use('/users', userRouter);
app.use('/', router);
app.all('*', (req, res) => {
   res.status(HTTPStatus.NOT_FOUND).send(new Response(HTTPStatus.NOT_FOUND.status, HTTPStatus.NO_CONTENT.status, 'Path not found.'));
});

//router
router.get('/', (req, res) => {
   app.use(express.static(path.resolve('./views/')));
   res.sendFile(path.resolve('./views/index.html'));
});

app.listen(8080, () => {
   console.log('listening on port 8080');
});

