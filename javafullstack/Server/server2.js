const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // Replace with your MySQL password
    database: "health_and_wellness", // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to the MySQL database.");
});

// Route to handle appointment booking
app.post("/book-appointment", (req, res) => {
    const { appointmentDate, appointmentTime, appointmentType } = req.body;

    const query = "INSERT INTO appointments (appointment_date, appointment_time, appointment_type) VALUES (?, ?, ?)";
    db.query(query, [appointmentDate, appointmentTime, appointmentType], (err, result) => {
        if (err) {
            console.error("Error inserting appointment data:", err);
            return res.status(500).send("Error booking appointment.");
        }
        console.log("Appointment booked:", result);
        res.send("Appointment booked successfully!");
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
