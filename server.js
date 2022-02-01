import express from 'express'
import path from 'path'
import mysql from 'mysql'

const app = express();
const router = express.Router();
const PORT = 8080;

//database setup


app.use('/', router);
app.use(express.static(path.resolve('./views/css')));
app.use(express.static(path.resolve('./views/js')));

app.listen(PORT, () => {
    console.log('Listening on port=' + PORT);
});

router.get('/', (req, res) => {
   res.sendFile(path.resolve('./views/index.html'));
});

