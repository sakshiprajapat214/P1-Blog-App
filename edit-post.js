const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
const username = urlParams.get('username');
console.log(username)

const form = document.getElementById('myForm');
const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');
const authorNameInput = document.getElementById('authorname');
const message = document.getElementById('message');

// Fetch the blog post data from the JSON server
fetch(`http://localhost:3000/blogs/${postId}`)
  .then(response => response.json())
  .then(blogPost => {
    titleInput.value = blogPost.Title;
    bodyInput.value = blogPost.Body;
    authorNameInput.value = blogPost.Author;
  })
  .catch(error => {
    console.error('Error:', error);
  });

form.addEventListener('submit', async e => {
  e.preventDefault();

  const updatedBlogPost = {
    Title: titleInput.value,
    Body: bodyInput.value,
    Author: authorNameInput.value,
    username : username
  };


  // Show browser confirm dialog
  var result = window.confirm('Are you sure you want to update?');
  if (result === true) {
    // Send a POST request to the JSON server
    const response = await fetch(`http://localhost:3000/blogs/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBlogPost)
    })
      .then(function (response) {
        if (response.ok) {
          // Show success message
          document.getElementById('message').style.color = 'darkgreen';
          document.getElementById('message').textContent = 'Post updated successfully.';
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
