import React from "react";

const Card = ({ post }) => {
  const handleClick = () => {
    window.open(post.url, "_blank");
  };

  return (
    <div
    className="card-container"
      onClick={handleClick}
      style={{
        borderTop: "4px solid #FEF074",
        borderRadius: "4px",
        background: "#fff",
        margin: "16px 0",
        lineHeight: "20px",
        padding: "16px",
        cursor: "pointer",
        boxShadow: "0px 0px 8px 0px #00000014",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", color: "#333", fontSize:"1.32rem", lineHeight: "20px", }}>{post.title}</h3>
      <p
        style={{
          margin: 0,
          color: "#555",
          fontSize:"0.87rem",
          padding: "10px 0",
        }}
      >
        {post.selftext || "No content available."}
      </p>
    </div>
  );
};

export default Card;
