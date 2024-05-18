document.getElementById('admin-login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const adminUsername = document.getElementById('admin-username').value;
    const adminPassword = document.getElementById('admin-password').value;

    // Check against hardcoded admin credentials (for demo purposes)
    if (adminUsername === 'admin' && adminPassword === 'admin21') {
        sessionStorage.setItem('adminLoggedIn', true);
        window.location.href = 'admin.html'; // Redirect to admin page after successful login
    } else {
        document.getElementById('admin-error-message').textContent = 'Invalid username or password';
    }
});
