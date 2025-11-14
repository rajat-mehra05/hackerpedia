export const extractDomain = (url) => {
  if (!url) return '';
  
  try {
    return url
      .replace('http://', '')
      .replace('https://', '')
      .split(/[/?#]/)[0]
      .replace('www.', '');
  } catch (error) {
    return '';
  }
};

export const filterStories = (stories, searchQuery) => {
  if (!searchQuery || searchQuery.trim() === '') {
    return stories;
  }

  const query = searchQuery.toLowerCase().trim();
  
  return stories.filter((story) => {
    if (!story) return false;
    
    const titleMatch = story.title?.toLowerCase().includes(query);
    const domainMatch = story.url ? extractDomain(story.url).toLowerCase().includes(query) : false;
    
    return titleMatch || domainMatch;
  });
};

export const highlightText = (text, query) => {
  if (!query || !text) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
};

