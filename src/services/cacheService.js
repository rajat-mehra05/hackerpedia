import * as hnAPI from './hnAPI';
import { getCacheItem, setCacheItem, initCache, CACHE_TYPES } from '../utils/cacheUtils';

// Initialize cache on module load
initCache();

// Cached version of getStoryIds
export const getStoryIds = async (category) => {
  const cacheKey = `category-${category}`;
  
  // Check cache first
  const cachedData = getCacheItem(cacheKey);
  if (cachedData !== null) {
    return cachedData;
  }

  // Cache miss - fetch from API
  const data = await hnAPI.getStoryIds(category);
  
  // Store in cache
  setCacheItem(cacheKey, data, CACHE_TYPES.CATEGORY);
  
  return data;
};

// Cached version of getStory
export const getStory = async (storyId) => {
  const cacheKey = `story-${storyId}`;
  
  // Check cache first
  const cachedData = getCacheItem(cacheKey);
  if (cachedData !== null) {
    return cachedData;
  }

  // Cache miss - fetch from API
  const data = await hnAPI.getStory(storyId);
  
  // Store in cache
  setCacheItem(cacheKey, data, CACHE_TYPES.STORY);
  
  return data;
};

// Cached version of getComment
export const getComment = async (commentId) => {
  const cacheKey = `story-${commentId}`; // Comments are items, use story cache type
  
  // Check cache first
  const cachedData = getCacheItem(cacheKey);
  if (cachedData !== null) {
    return cachedData;
  }

  // Cache miss - fetch from API
  const data = await hnAPI.getComment(commentId);
  
  // Store in cache
  if (data) {
    setCacheItem(cacheKey, data, CACHE_TYPES.STORY);
  }
  
  return data;
};

// Cached version of getComments
export const getComments = async (commentIds) => {
  if (!commentIds || commentIds.length === 0) return [];
  
  try {
    const commentPromises = commentIds.map(id => getComment(id));
    const comments = await Promise.all(commentPromises);
    return comments.filter(comment => comment !== null);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};

// Cached version of getCommentsRecursive
export const getCommentsRecursive = async (commentIds, maxDepth = 10, currentDepth = 0, storyId = null) => {
  // For the root level, check if we have the entire comment thread cached
  if (currentDepth === 0 && storyId) {
    const cacheKey = `comments-${storyId}`;
    const cachedData = getCacheItem(cacheKey);
    if (cachedData !== null) {
      return cachedData;
    }
  }

  if (!commentIds || commentIds.length === 0 || currentDepth >= maxDepth) {
    return [];
  }

  const comments = await getComments(commentIds);
  
  const commentsWithReplies = await Promise.all(
    comments.map(async (comment) => {
      if (comment && comment.kids && comment.kids.length > 0) {
        const replies = await getCommentsRecursive(
          comment.kids,
          maxDepth,
          currentDepth + 1,
          null // Only cache the root level
        );
        return { ...comment, replies };
      }
      return { ...comment, replies: [] };
    })
  );

  // Cache the entire comment thread at the root level
  if (currentDepth === 0 && storyId) {
    const cacheKey = `comments-${storyId}`;
    setCacheItem(cacheKey, commentsWithReplies, CACHE_TYPES.COMMENTS);
  }

  return commentsWithReplies;
};

