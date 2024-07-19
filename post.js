

document.getElementById('myForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission

  // Get the form values
  var title = document.getElementById('title').value;
  var body = document.getElementById('body').value;
  var authorname = document.getElementById('authorname').value;

  // Get the username from localStorage
  var username = localStorage.getItem('username');

  console.log('Username:', username);

  // Create the new blog post object
  var newPost = {
    username: username,
    Title: title,
    Body: body,
    Author: authorname
  };

  
    // Show browser confirm dialog
    var result = window.confirm('Are you sure you want to continue?');
    if (result === true) {
      // Send a POST request to the JSON server
      fetch('http://localhost:3000/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost)
      })
        .then(function (response) {
          if (response.ok) {
            // Show success message
            document.getElementById('message').style.color = 'darkgreen';
            document.getElementById('message').textContent = 'Post created successfully.';
            // Redirect to home.html
            window.location.href = 'home.html';
          } else {
            // Show error message
            document.getElementById('message').style.color = 'darkred';
            document.getElementById('message').textContent = 'Failed to create post.';
          }
        })
        .catch(function (error) {
          // Show error message
          document.getElementById('message').textContent = 'An error occurred while creating the post.';
        });
    } else {
      // Handle when user clicks "Cancel" or closes the dialog
      // You can perform any desired action here
      console.log('User canceled');
      document.getElementById('message').style.color = 'darkred';
      document.getElementById('message').textContent = 'Failed to create post.';
      window.location.href = 'home.html';
    }
  });
  