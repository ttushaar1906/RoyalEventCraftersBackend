// const express = require('express');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const { emit } = require('nodemon');

// const app = express();

// // // Update the middleware setup
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'eventmanagement'
// });

// connection.connect((err) => {
//     if (err) throw err;
//     console.log("Database connected");
// });

// // Sign up logic

// app.post('/signup', (req, resp) => {
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;

//     connection.query('INSERT into signup ( username, email, password) VALUES (?, ?, ?)', [username, email, password], (error, results, fields) => {
//         if (error) {
//             console.error(error);
//         } else {
//             console.log('User has been added to the database.');
//         }
//     });
// })

// // login

// app.post('/login', (req, res) => {
//     const { email, password } = req.body;
//     const query = 'SELECT * FROM signup WHERE email = ? AND password = ?';
//     connection.query(query, [email, password], (error, results) => {
//         if (error) {
//             console.error('Error executing query:', error);
//             return res.status(500).send('Server error');
//         }
//         if (results.length === 0) {
//             alert("Error No User Found!!")
//             return res.status(401).send('Error no User Found!!!');
//         }
//         // Successful login
//     });
// });

// // feedback

// // Feed Back

// app.post('/feed', (req, resp) => {
//     const name = req.body.name; // Corrected property name
//     const email = req.body.email;
//     const user_mobileno = req.body.user_mobileno;
//     const rating = req.body.rating;
//     const message = req.body.message;

//     connection.query('INSERT into feedback (name, email, user_mobileno, rating, message) VALUES (?, ?, ?, ?, ?)', [name, email, user_mobileno, rating, message], (error, results, fields) => {
//         if (error) {
//             console.error(error);
//             resp.status(500).send('Error while submitting feedback'); // Respond with an error status
//         } else {
//             console.log('Feedback has been added to the database.');
//             resp.sendStatus(200); // Respond with a success status
//         }
//     });
// });
// app.listen(1920);