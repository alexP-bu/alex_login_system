import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import userRouter from './modules/userRouter.js';
import HTTPStatus from './modules/HTTPStatus.js';
import Response from './modules/Response.js';

dotenv.config({path: './.env'});
const app = express();
const router = express.Router();
const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//routes
app.use('/users', userRouter);
app.use('/', router);

//router
app.use(express.static(path.join(__dirname, '/views')));
router.get('/', (req, res) => {
   res.sendFile(path.resolve('./views/index.html'));
});

app.listen(8080, () => {
   console.log('listening on port 8080');
});

