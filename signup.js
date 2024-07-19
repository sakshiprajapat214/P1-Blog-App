document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // Perform signup validation and submission
        // You can add your code here to handle form submission
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const mobile = document.getElementById('mobile').value;
      const address = document.getElementById('address').value;
      const dob = document.getElementById('dob').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Calculate age based on the selected date of birth
      const currentDate = new Date();
      const selectedDate = new Date(dob);
      const age = currentDate.getFullYear() - selectedDate.getFullYear();

      // Check if age is greater than or equal to 18
      if (age < 18) {
        alert('You must be at least 18 years old to sign up.');
        return;
      }

      // Create user object
      const newUser = {
        name,
        email,
        mobile,
        address,
        dob,
        username,
        password
      };

      // Send POST request to JSON server
      fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
        .then(response => response.json())
        .then(data => {
          console.log('User created:', data);
          // Redirect to login page
          window.location.href = 'login.html';
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error or display error message to the user
        });
    });
  });


