const mysql = require('mysql');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({extendex: false}));
app.use(express.json());

var config = 
{
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs',
    port: 3306
}

const conn = new mysql.createConnection(config);

conn.connect(function(err){
    if(err){
        console.log("Connessione non stabilita");
        throw err;
    }
    else{
        console.log("Connessione stabilita");
    }
});

app.get('/api/employees', (request, response) => {
    let sel = 'SELECT * FROM employee'
    conn.query(sel, (error, results, fields) => {
        if(error) {
            response.json(error);
        }
        response.json(results);
    });
})


app.listen(3000, () => console.log('Server arrivo sulla porta 3000'));