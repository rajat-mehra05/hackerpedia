import axios from "axios";

export const BASE_URL = "https://hacker-news.firebaseio.com/v0/";

export const getStoryIds = async (category) => {
  const res = await axios.get(`${BASE_URL}${category}.json`);
  return res.data;
};

export const getStory = async (storyId) => {
  const resp = await axios.get(`${BASE_URL}item/${storyId}.json`);
  return resp.data;
};

export const getComment = async (commentId) => {
  try {
    const resp = await axios.get(`${BASE_URL}item/${commentId}.json`);
    return resp.data;
  } catch (error) {
    console.error(`Error fetching comment ${commentId}:`, error);
    return null;
  }
};

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

export const getCommentsRecursive = async (commentIds, maxDepth = 10, currentDepth = 0) => {
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
          currentDepth + 1
        );
        return { ...comment, replies };
      }
      return { ...comment, replies: [] };
    })
  );

  return commentsWithReplies;
};
