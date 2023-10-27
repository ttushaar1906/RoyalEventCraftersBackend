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

// wedding
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

//wedding where conditon

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

//anniversary
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

router.get('/RoyalEvent/anniversary/:placeTitle', (req, res) => {
    const place = req.params.placeTitle;

    if (!place) {
        return res.status(400).send('City parameter is missing');
    }

    const sql = 'SELECT * FROM anniversary WHERE placeTitle = ?';

    connection.query(sql, [place], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); 
        }
    });
});

// birthdayParty
router.get('/RoyalEvent/birthdayParty', (req, res) => {
    connection.query('SELECT * FROM birthdayParty', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
});
//where
router.get('/RoyalEvent/birthdayparty/:partyType', (req, res) => {
    const place = req.params.partyType;

    if (!place) {
        return res.status(400).send('City parameter is missing');
    }

    const sql = 'SELECT * FROM birthdayparty WHERE partyType = ?';

    connection.query(sql, [place], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); 
        }
    });
});
//conferences

router.get('/RoyalEvent/:eventTitle', (req, res) => {
    const place = req.params.eventTitle;

    if (!place) {
        return res.status(400).send('Event parameter is missing');
    }

    const sql = 'SELECT * FROM events WHERE eventTitle = ?';

    connection.query(sql, [place], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); 
        }
    });
});

// other Items

router.get('/RoyalEvent/wedding/otheritems', (req, res) => {

    connection.query('SELECT * FROM otheritems', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
});


    // const place = req.params.weddingCity;

    // if (!place) {
    //     return res.status(400).send('City parameter is missing');
    // }

    // const sql = 'SELECT * FROM otheritems';

//     connection.query(sql, [place], (err, results) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error retrieving data from the database');
//         } else {
//             console.log(results);
//             res.json(results); 
//         }
//     });
// });

// where conditions
// router.get('/wedding/weddingCity', (req, res) => {
//     const condition = req.query.condition; // You can pass the condition as a query parameter
  
//     const query = 'SELECT * FROM wedding';
//     connection.query(query, [condition], (err, results) => {
//       if (err) {
//         console.error('Error querying MySQL:', err);
//         res.status(500).json({ error: 'Database error' });
//         return;
//       }
//       res.json(results);
//     });
//   });



router.post('/',(req,res)=>{
    this.connect.query()
})
module.exports = router;
