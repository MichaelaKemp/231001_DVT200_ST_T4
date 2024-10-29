const express = require('express');
const path = require('path');
const mysql = require('mysql');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for URL-encoded data if needed
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

  // Check if required fields are present
  if (!name || !surname || !email || !message) {
    console.error("Form data is incomplete");
    res.status(400).send("Form data is incomplete.");
    return;
  }

  // Insert form data into the database
  const query = 'INSERT INTO feedback (name, surname, email, message) VALUES (?, ?, ?, ?)';
  db.query(query, [name, surname, email, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err); 
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