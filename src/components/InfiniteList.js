import React, { useState, useEffect, useRef, useCallback } from 'react';
import Card from './Card';
import { fetchSubredditPosts } from '../services/redditService';

function InfiniteList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextAfter, setNextAfter] = useState(null);
  const observer = useRef(null);

  const loadMorePosts = useCallback(async () => {
    setLoading(true);
    try {
      const { posts: newPosts, nextAfter: newAfter } = await fetchSubredditPosts('FlutterDev', 'hot', nextAfter);
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setNextAfter(newAfter);
    } catch (error) {
      console.error('Error fetching more posts:', error);
    } finally {
      setLoading(false);
    }
  }, [nextAfter]);

  useEffect(() => {
    loadMorePosts();
  }, []);

  useEffect(() => {
    if (loading) return;

    const handleObserver = entries => {
      const entry = entries[0];
      if (entry.isIntersecting) loadMorePosts();
    };

    const observerInstance = new IntersectionObserver(handleObserver, {
      root: null,
      threshold: 1.0,
    });

    const target = observer.current;
    if (target) observerInstance.observe(target);

    return () => {
      if (target) observerInstance.unobserve(target);
    };
  }, [loading, loadMorePosts]);

  return (
    <div className="infinite-list">
      {posts.map((post, index) => (
        <Card key={index} post={post} />
      ))}
      <div ref={observer} />
      {loading && <p>Loading more...</p>}
    </div>
  );
}

export default InfiniteList;
