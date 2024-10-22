const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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
  const { fullName, phoneNumber, emailAddress, message } = req.body;

  // Insert form data into the database
  const query = 'INSERT INTO contacts (full_name, phone_number, email, message) VALUES (?, ?, ?, ?)';
  db.query(query, [fullName, phoneNumber, emailAddress, message], (err, result) => {
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