
async function getBlogPosts() {
    try {
      const response = await fetch('http://localhost:3000/blogs');
      const data = await response.json();
      const blogs = document.getElementById('blog');
  
      await data.forEach(blogPost => {
        const blogPostDiv = document.createElement('div');
        const truncatedBody = blogPost.Body.substring(0, 50) + '...';
        const remainingBody = blogPost.Body.substring(50);
  
        blogPostDiv.innerHTML = `
          <div class="blog-post">
            <div class="blog-title" style="font-size: 4ch;"><b>Title: ${blogPost.Title}</b></div>
            <div class="blog-truncate">${truncatedBody}</div>
            <div class="blog-full" style="display: none;">${remainingBody}</div>
            <button style="color:blue;" class="show-more-btn">Show More</button>
            <div class="blog-author"><b>Author: ${blogPost.Author}</b></div>
          </div>
          <br>
        `;
  
        blogs.appendChild(blogPostDiv);
      });
  
      const showMoreBtns = document.getElementsByClassName('show-more-btn');
      Array.from(showMoreBtns).forEach(btn => {
        btn.addEventListener('click', () => {
          const blogPost = btn.parentNode;
          const truncateDiv = blogPost.getElementsByClassName('blog-truncate')[0];
          const fullDiv = blogPost.getElementsByClassName('blog-full')[0];
          const showMoreBtn = blogPost.getElementsByClassName('show-more-btn')[0];
  
          truncateDiv.style.display = 'none';
          fullDiv.style.display = 'block';
          showMoreBtn.style.display = 'none';
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  getBlogPosts();
  


