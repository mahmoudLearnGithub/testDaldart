import React from 'react';

function Card({ post }) {
  return (
    <div className="card">
      <h3>{post.title}</h3>
      <p>by {post.author}</p>
      <a href={post.url} target="_blank" rel="noopener noreferrer">View Post</a>
    </div>
  );
}

export default Card;
