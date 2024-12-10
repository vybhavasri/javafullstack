// WebContent/js/script.js

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Login form submitted!");
    // Implement login logic here
});

document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Registration form submitted!");
    // Implement registration logic here
});

document.getElementById("appointmentForm").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Appointment form submitted!");
    // Implement appointment booking logic here
});
