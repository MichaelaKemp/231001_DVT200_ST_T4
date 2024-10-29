const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data and JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Add this for JSON payloads
app.use(express.static(path.join(__dirname)));

// Database connection
const db = mysql.createConnection(process.env.JAWSDB_URL);

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to JawsDB.');
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  console.log("Form data received:", req.body); // Log incoming data
  const { name, surname, email, message } = req.body;

  // Check for null or undefined values
  if (!name || !surname || !email || !message) {
    console.error("One or more form fields are missing");
    res.status(400).send("Form data is incomplete.");
    return;
  }

  // Insert form data into the database
  const query = 'INSERT INTO feedback (name, surname, email, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, surname, email, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);  // Log the full error details
      res.status(500).send('Failed to save the form data.');
      return;
    }
    res.send('Form submitted successfully!');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});