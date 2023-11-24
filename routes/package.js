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
router.get('/RoyalEvent/wedding', (req, res) => {
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

router.get('/RoyalEvent/wedding/:weddingCity', (req, res) => {
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

// other Items

router.get('/wedding/otheritems', (req, res) => {
    connection.query('SELECT * FROM otheritems', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
})
  
//awards ceremony

router.get('/RoyalEvent/awardceremony', (req, res) => {
    connection.query('SELECT * FROM awardceremony', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
});

//conferences

router.get('/RoyalEvent/conferences', (req, res) => {
    connection.query('SELECT * FROM conferences', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
});

// brandlaunch

router.get('/RoyalEvent/brandlaunch', (req, res) => {
    connection.query('SELECT * FROM brandlaunch', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
});

// pressconferences
router.get('/RoyalEvent/pressconferences', (req, res) => {
    connection.query('SELECT * FROM pressconferences', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
});

//Bill

router.get('/RoyalEvent/bill/:eventLoc',(req,res)=>{
    const event = req.params.eventLoc;
    if (!event){
        return res.status(400).send('Username not found');
    }
    connection.query('SELECT * from orders where eventLoc = ?',(err,results)=>{
        if(err){
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
});

//Admi section
//  1 ) Orders
router.get('/RoyalEvent/Admi', (req, res) => {
    connection.query('SELECT * FROM orders order by bookingDate' , (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
});
//  2 Contact Us
router.get('/RoyalEvent/Admi/contact', (req, res) => {
    connection.query('SELECT * FROM contactus' , (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
});

// 3 Feedback

router.get('/RoyalEvent/Admi/review', (req, res) => {
    connection.query('SELECT * FROM feedback' , (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving data from the database');
        } else {
            console.log(results);
            res.json(results); // Send the results as JSON to the client
        }
    });
});

router.post('/',(req,res)=>{
    this.connect.query()
})
module.exports = router;
