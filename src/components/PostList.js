import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";

const PostList = ({ activeTab }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [after, setAfter] = useState(null); // Keeps track of pagination for each tab

  const fetchPosts = async (append = false) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://www.reddit.com/r/FlutterDev/${activeTab}.json`, {
        params: { after: after || "" },
      });

      const newPosts = response.data.data.children.map((child) => ({
        id: child.data.id,
        title: child.data.title || "Untitled",
        selftext: child.data.selftext || "No content available.",
        url: `https://www.reddit.com${child.data.permalink}`,
      }));

      setPosts((prevPosts) => (append ? [...prevPosts, ...newPosts] : newPosts));
      setAfter(response.data.data.after); // Update the pagination cursor
    } catch (error) {
      console.error(`Error fetching posts for tab "${activeTab}":`, error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setAfter(null); // Reset pagination when activeTab changes
    setPosts([]);   // Clear posts for new tab
    fetchPosts();   // Fetch posts for the current active tab
  }, [activeTab]);

  const loadMore = () => {
    if (after) fetchPosts(true); // Load more only if there are additional pages
  };

  return (
    <div className={"posts"}>
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
      {loading && <p>Loading...</p>}
      {!loading && after && (
        <button
          onClick={loadMore}
          style={{
            display: "block",
            margin: "20px auto",
            padding: "10px 20px",
            lineHeight: "20px",
            background: "#6200ea",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default PostList;
