const mysql = require('mysql');
const fs = require('fs');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.urlencoded({extendex: false}));
app.use(express.json());

let employees = [];

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
        readData();
        console.log(employees);
    }
});

function readData(){
    conn.query('SELECT * FROM employee',
    function(err, results, fields){
        if(err) throw err;
        else console.log('Selected ' + results.length + ' row(s)');
        for(let i=0; i<results.length; i++){
            //console.log('Row: ' + JSON.stringify(results[i]));
            employees.push(results[i]);

        }
        console.log('Done.');

        //apiGet(employees);

        app.get('/api/employees', (request, response) => {
            response.json(employees);
        })


        console.log(employees);
    })
    conn.end(
        function (err){
            if(err) throw err;
            else console.log('Closing connection');
        }
    )
}

/* function apiGet(emp){
    app.get('/api/employees', (request, response) => {
        response.json(emp);
    })
} */

app.listen(3000, () => console.log('Server arrivo sulla porta 3000'));