document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the username from localStorage
    var username = localStorage.getItem('username');
    window.console.log(username);

    // Call the getBlogPosts function
    getBlogPosts();

    // Add event listener to logout button
    var logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', function () {
        // Clear the username from localStorage
        localStorage.removeItem('username');
        // Redirect to blog.html
        window.location.href = 'blog.html';
    });

    // Check if the user is logged in
    if (!username) {
        // User is not logged in, redirect to blog.html and replace the home.html in the history
        window.history.pushState(null, '', 'blog.html');
    }

    // Monitor the history changes
    window.addEventListener('popstate', function (event) {
        // Check if the user is logged in
        if (!username) {
            // User is not logged in, redirect to blog.html and replace the home.html in the history
            window.history.pushState(null, '', 'blog.html');
        }
    });
});

async function getBlogPosts() {
    try {
        const response = await fetch('http://localhost:3000/blogs');
        const data = await response.json();
        const blogs = document.getElementById('blog');

        // Fetch the user data from the JSON server
        fetch('http://localhost:3001/users')
            .then(response => response.json())
            .then(users => {
                data.forEach(blogPost => {
                    const user = users.find(user => user.username === username);

                    const blogPostDiv = document.createElement('div');
                    blogPostDiv.innerHTML = `
                        <h2>Title: ${blogPost.Title}</h2>
                        <p>${blogPost.Body}</p>
                        <span><b>Author: ${blogPost.Author}</b></span>
                    `;

                    if (user) {
                        // User found, customize the blog post display
                        if (user.username === blogPost.username) {
                            blogPostDiv.innerHTML += `
                                <span class="post-op">
                                    <a href="#" onclick="deleteBlogPost(${blogPost.id})">Delete</a> 
                                </span>
                                <span class="post-op">
                                <a href="edit-post.html?id=${blogPost.id}&username=${username}">Edit</a>  
                                </span>
                                <br/><br/>
                            `;
                        }
                    }

                    blogPostDiv.innerHTML += `<br/><br/>`;
                    blogs.appendChild(blogPostDiv);
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } catch (error) {
        console.log(error);
    }
}

async function deleteBlogPost(postId) {
    try {
        const response = await fetch(`http://localhost:3000/blogs/${postId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Blog post deleted successfully');
            // Refresh the blog posts after deletion
            getBlogPosts();
        } else {
            console.error('Failed to delete blog post');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
