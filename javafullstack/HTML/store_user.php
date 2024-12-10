
<?php
// Database connection details
$servername = "localhost";
$username = "root"; // Your MySQL username
$password = "root"; // Your MySQL password
$database = "health_and_wellness";

// Create a connection to the MySQL database
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the form data from the POST request
$email = $_POST['email'];
$password = $_POST['password'];
$role = $_POST['role'];

// Hash the password before storing it in the database
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Prepare and execute the SQL query to insert user details
$sql = "INSERT INTO users (email, password, role) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $email, $hashedPassword, $role);

if ($stmt->execute()) {
    echo "User details successfully stored in the database.";
    // Redirect to another page (e.g., home.html)
    header("Location: home.html");
    exit();
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
