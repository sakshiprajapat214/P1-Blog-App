document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
  
    // Get the entered username and password
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Fetch the user data from the JSON server
    fetch('http://localhost:3001/users')
      .then(response => response.json())
      .then(users => {
        // Find the user with the matching username and password
        var user = users.find(user => user.username === username && user.password === password);
  
        if (user) {
          // Login successful
          alert('Login successful!');
          // Store the username in localStorage
          localStorage.setItem('username', username);
          // Perform any additional actions, such as redirecting to another page
          window.location.href = './home.html'
        } else {
          // Login failed
          alert('Invalid username or password. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
});
