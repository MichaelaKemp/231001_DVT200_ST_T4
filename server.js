const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
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
  const { name, surname, email, message } = req.body;

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