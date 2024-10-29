<?php
// Database connection details
$host = 'YOUR_HOST';
$dbname = 'YOUR_DATABASE_NAME';
$username = 'YOUR_DATABASE_USERNAME';
$password = 'YOUR_DATABASE_PASSWORD';

// Create a connection to the database
$conn = new mysqli($host, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve and sanitize form data
$name = $conn->real_escape_string($_POST['name']);
$surname = $conn->real_escape_string($_POST['surname']);
$email = $conn->real_escape_string($_POST['email']);
$message = $conn->real_escape_string($_POST['message']);

// Prepare and execute the SQL statement to insert the data
$sql = "INSERT INTO feedback (name, surname, email, message)
        VALUES ('$name', '$surname', '$email', '$message')";

if ($conn->query($sql) === TRUE) {
    echo "Thank you! Your message has been received.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the connection
$conn->close();
?>