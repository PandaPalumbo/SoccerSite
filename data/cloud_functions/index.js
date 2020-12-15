const express = require('express');
require('dotenv').config();
var cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;
app.use(cors());

const connection =  mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PW,
    database: process.env.DB
});



connection.connect(()=> console.log('connected!'))

app.get('/', (req, res) => {
    res.send('Hello world')
})


app.get('/teams', (req, res) => {
    connection.query('SELECT * FROM teams', (err, data, fields) => {
        if(err) throw err;
        res.send(data);

    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

