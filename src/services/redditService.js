const REDDIT_API_URL = 'https://www.reddit.com/r/';

export async function fetchSubredditPosts(subreddit, sort, after = null) {
  let url = `${REDDIT_API_URL}${subreddit}/${sort}.json?limit=10`;
  if (after) {
    url += `&after=${after}`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch posts');
  
  const data = await response.json();
  return {
    posts: data.data.children.map(child => ({
      title: child.data.title,
      author: child.data.author,
      url: `https://www.reddit.com${child.data.permalink}`,
    })),
    nextAfter: data.data.after,
  };
}