const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'eventmanagement'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Database connected");
});

router.get('/wedding', (req, res) => {
    connection.query('SELECT * FROM wedding', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
});

router.get('/wedding/:weddingCity', (req, res) => {
    const city = req.params.weddingCity;

    if (!city) {
        return res.status(400).send('City parameter is missing');
    }

    const sql = 'SELECT * FROM wedding WHERE weddingCity = ?';

    connection.query(sql, [city], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); 
        }
    });
});

router.get('/anniversary', (req, res) => {
    connection.query('SELECT * FROM anniversary', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
});

// where conditions
router.get('/wedding/weddingCity', (req, res) => {
    const condition = req.query.condition; // You can pass the condition as a query parameter
  
    const query = 'SELECT * FROM wedding';
    connection.query(query, [condition], (err, results) => {
      if (err) {
        console.error('Error querying MySQL:', err);
        res.status(500).json({ error: 'Database error' });
        return;
      }
      res.json(results);
    });
  });



router.post('/',(req,res)=>{
    this.connect.query()
})
module.exports = router;
