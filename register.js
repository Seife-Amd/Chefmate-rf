document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    if (newUsername && newPassword) {
        // Save the credentials to localStorage (for demo purposes)
        localStorage.setItem('username', newUsername);
        localStorage.setItem('password', newPassword);

        // Show success message
        document.getElementById('message-text').textContent = 'You are successfully registered!';
        document.getElementById('message-box').style.display = 'block';
    } else {
        // Show error message
        document.getElementById('register-error-message').textContent = 'Please enter a valid username and password';
    }
});

document.getElementById('close-message-button').addEventListener('click', function() {
    document.getElementById('message-box').style.display = 'none';
    window.location.href = 'login.html'; // Redirect to login page after closing message
});
//NewllyddedFunctionality
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;

    if (newUsername && newPassword) {
        // Retrieve the existing users array from localStorage or create a new one
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Add the new user to the array
        users.push({ username: newUsername, password: newPassword });

        // Save the updated users array back to localStorage
        localStorage.setItem('users', JSON.stringify(users));

        // Show success message
        document.getElementById('message-text').textContent = 'You are successfully registered!';
        document.getElementById('message-box').style.display = 'block';
    } else {
        // Show error message
        document.getElementById('register-error-message').textContent = 'Please enter a valid username and password';
    }
});

document.getElementById('close-message-button').addEventListener('click', function() {
    document.getElementById('message-box').style.display = 'none';
    window.location.href = 'login.html'; // Redirect to login page after closing message
});

