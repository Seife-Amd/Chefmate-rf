document.addEventListener('DOMContentLoaded', function() {
    // Check if the admin is logged in
    if (!sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin-login.html'; // Redirect to admin login page if not logged in
    } else {
        displayUsers();
    }
});

function displayUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userList = document.getElementById('user-list');

    users.forEach(user => {
        const row = document.createElement('tr');
        const usernameCell = document.createElement('td');
        const passwordCell = document.createElement('td');

        usernameCell.textContent = user.username;
        passwordCell.textContent = user.password;

        row.appendChild(usernameCell);
        row.appendChild(passwordCell);
        userList.appendChild(row);
    });
}

function logout() {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin-login.html';
}
