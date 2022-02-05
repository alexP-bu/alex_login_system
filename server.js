import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import userRouter from './modules/userRouter.js';
import HTTPStatus from './modules/HTTPStatus.js';
import Response from './modules/Response.js';

dotenv.config({path: './.env'});
const app = express();
const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//settings
app.use(express.json());
app.use('/users', userRouter);
app.use(express.static(path.join(__dirname, '/views')));

//routing
app.get('/', (req, res) => {
   res.sendFile(path.resolve('./views/index.html'));
});
app.all('*', (req, res) => {
   res.status(HTTPStatus.NOT_FOUND.code).send(new Response(HTTPStatus.NOT_FOUND.code, HTTPStatus.NOT_FOUND.status, 'error routing'));
});

app.listen(8080, () => {
   console.log('listening on port 8080');
});

