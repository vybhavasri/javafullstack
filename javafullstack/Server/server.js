const express = require('express'); // Import Express
const mysql = require('mysql2'); // Use mysql2 for database connections
const bodyParser = require('body-parser'); // Parse incoming request bodies

// Create an Express app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'health_and_wellness' // Replace with your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Define a route to handle form submissions
app.post('/submit', (req, res) => {
    const { email, password, role } = req.body; // Extract form data

    // Insert data into the `users` table
    const query = 'INSERT INTO users (email, password, role) VALUES (?, ?, ?)';
    db.query(query, [email, password, role], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error inserting data');
        }
        console.log('Data inserted:', result);
        res.send('Form data submitted successfully');
    });
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
