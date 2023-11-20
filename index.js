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
app.post("/login", (req, resp) => {
  const { email, password } = req.body;
  connection.query(
    "SELECT * FROM signup WHERE email = ? AND password = ?",
    [email, password],
    (error, result) => {
      if (error) {
        console.error("Error executing query:");
        return resp.status(500).send("Server error");
      }

      if (result.length === 0) {
        return resp.status(401).send("Invalid UserName or Password");
      }

      // User authentication successful
      resp.status(200).send("Login successful");
    }
  );
});


// signup
app.post('/signup', (req, resp) => {
  const { username, email, password } = req.body;
  
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
    /* 1*/const eventLoc = req.body.eventLoc;
    /* 2*/ const username = req.body.username; 
    /* 3*/ const mobileNo = req.body.mobileNo;
    /* 4*/ const email = req.body.email;
    /* 5*/ const bookingDate = req.body.bookingDate;
    /* 6*/ const noOfGuests = req.body.noOfGuests;
    /* 7*/ const eventTime = req.body.eventTime;
    /* 8*/ const city = req.body.city;
    /* 9*/ const addresss = req.body.addresss;
    /* 10*/const placePrice = req.body.placePrice;
    /* 11*/ const Host = req.body.Host;
    /* 12*/ const BallonDeco = req.body.BallonDeco;
    /* 13*/ const Godi = req.body.Godi;
    /* 14*/ const Car = req.body.Car;
    /* 15*/ const Pandit = req.body.Pandit;
    /* 16*/ const PaperBlast = req.body.PaperBlast;
    /* 17*/ const FogMachine = req.body.FogMachine;
    /* 18*/ const MicSound = req.body.MicSound;
    /* 19*/ const MicSoundScreen = req.body.MicSoundScreen;
    /* 20*/ const FlowerDeco = req.body.FlowerDeco;
    /* 21*/ const Chairs = req.body.Chairs;
    /*22*/  const Plates = req.body.Plates;
    /*23*/  const Tables = req.body.Tables;
    /*24*/  const LightSet = req.body.LightSet;

    connection.query('INSERT into orders (eventLoc,username, mobileNo,email,  bookingDate, noOfGuests,eventTime,city,addresss,Host,BallonDeco,Godi,Car,Pandit,PaperBlast,FogMachine,MicSound,MicSoundScreen,FlowerDeco,Chairs,Plates,Tables,LightSet,placePrice) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [eventLoc,username, mobileNo,email, bookingDate, noOfGuests, eventTime,city,addresss,Host,BallonDeco,Godi,Car,Pandit,PaperBlast,FogMachine,MicSound,MicSoundScreen,FlowerDeco,Chairs,Plates,Tables,LightSet,placePrice], (error, results, fields) => {
        if (error) {
            console.error(error);
            resp.status(500).send('Failed to place Order'); // Respond with an error status
        } else {
            console.log('Order has been added to the database.');
            // console.log(price);
            resp.sendStatus(200); // Respond with a success status
        }
    });
})



// contant us
app.post('/Contact', (req, resp) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobileNO = req.body.mobileNO; 
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
  const name = req.body.name; 
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