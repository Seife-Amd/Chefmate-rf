document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example hardcoded credentials
    const validUsername = 'Admin';
    const validPassword = 'admin';

    if (username === validUsername && password === validPassword) {
        // Successful login, redirect to main page
        window.location.href = 'main.html';
    } else {
        // Show error message
        document.getElementById('error-message').textContent = 'Invalid username or password';
    }
});
//newlyAddedfunctionality
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Retrieve stored credentials from localStorage
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        // Successful login, redirect to main page
        window.location.href = 'main.html';
    } else {
        // Show error message
        document.getElementById('error-message').textContent = 'Invalid username or password';
    }
});

