const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this
const mysql = require('mysql');
const app = express();


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'eventmanagement',
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Database connected");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Use CORS
const packages =require('./routes/package');
app.use('/packages',packages);

// login
const bcrypt = require('bcrypt');
app.post('/signup', (req, res) => {
  const email = req.body.email;
  console.log(email)
  const password = req.body.password;
  console.log(password)

  connection.query('SELECT * FROM signup WHERE email = ?', email, (err, result) => {
    if (err) {
      console.error(err); // Log the error for debugging
      res.status(500).send({ message: 'Login failed' });
    } else {
      if (result.length === 1) {
        bcrypt.compare(password, result[0].password, (bcryptErr, bcryptResult) => {
          if (bcryptErr) {
            console.error(bcryptErr); // Log the bcrypt error
            res.status(500).send({ message: 'Login failed' });
          } else if (bcryptResult) {
            res.status(200).send({ message: 'Login successful' });
            
          } else {
            res.status(401).send({ message: 'Invalid username or password' });
          }
        });
      } else {
        res.status(401).send({ message: 'Invalid username or password' });
      }
    }
  });
});

// signup
app.post('/signup', (req, resp) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  connection.query(
    'INSERT into signup (username, email, password) VALUES (?, ?, ?)',
    [username, email, password],
    (error, results, fields) => {
      if (error) {
        console.error(error);
        resp.status(500).send('Error while signing up'); // Respond with an error status
      } else {
        console.log('User has been added to the database.');
        resp.sendStatus(200); // Respond with a success status
      }
    }
  );
});

// orders

app.post('/orders', (req, resp) => {
    const eventLoc = req.body.eventLoc; 
    const username = req.body.username;
    const mobileNo = req.body.mobileNo;
    const email = req.body.email;
    const bookingDate = req.body.bookingDate;
    const noOfGuests = req.body.noOfGuests;
    const eventTime = req.body.eventTime;
    const city = req.body.city;
    const addresss = req.body.addresss;
    connection.query('INSERT into orders (eventLoc,username, mobileNo,email,  bookingDate, noOfGuests,eventTime,city,addresss) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [eventLoc,username, mobileNo,email, bookingDate, noOfGuests, eventTime,city,addresss], (error, results, fields) => {
        if (error) {
            console.error(error);
            resp.status(500).send('Failed to place Order'); // Respond with an error status
        } else {
            console.log('Order has been added to the database.');
            resp.sendStatus(200); // Respond with a success status
        }
    });
});

// contant us
app.post('/Contact', (req, resp) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobileNO = req.body.mobileNO; // Corrected field name
  const message = req.body.message;

  connection.query(
    'INSERT INTO contactUs (name, email, mobileNo, message) VALUES (?, ?, ?, ?)',
    [name, email, mobileNO, message],
    (error, result, fields) => {
      if (error) {
        console.error(error);
        resp.status(500).send('Error while submitting Contact Us');
      } else {
        console.log('Contact has been added to the database.');
        resp.sendStatus(200);
      }
    }
  );
});

// Feed Back
app.post('/feed', (req, resp) => {
  const name = req.body.name; // Corrected property name
  const email = req.body.email;
  const user_mobileno = req.body.user_mobileno;
  const rating = req.body.rating;
  const message = req.body.message;

  connection.query('INSERT into feedback (name, email, user_mobileno, rating, message) VALUES (?, ?, ?, ?, ?)', [name, email, user_mobileno, rating, message], (error, results, fields) => {
      if (error) {
          console.error(error);
          resp.status(500).send('Error while submitting feedback'); // Respond with an error status
      } else {
          console.log('Feedback has been added to the database.');
          resp.sendStatus(200); // Respond with a success status
      }
  });
});



app.listen(4000);