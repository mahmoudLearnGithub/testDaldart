import React, { useState, useEffect } from 'react';
import InfiniteList from '../components/InfiniteList';
import { fetchSubredditPosts } from '../services/redditService';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchSubredditPosts('FlutterDev', 'hot');
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="home-page">
      {error && <p>Error: {error}</p>}
      {loading ? <span>Loading more...   </span> : <InfiniteList items={posts} />}
    </div>
  );
}

export default HomePage;
