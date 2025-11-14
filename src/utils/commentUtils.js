export const isDeletedComment = (comment) => {
  return comment && (comment.deleted || comment.dead);
};

export const getCommentText = (comment) => {
  if (!comment) return '';
  if (isDeletedComment(comment)) return '[deleted]';
  return comment.text || '';
};

export const sanitizeHtml = (html) => {
  if (!html) return '';
  
  // Basic HTML sanitization - converts HN's HTML to safe display
  return html
    .replace(/<p>/g, '\n\n')
    .replace(/<\/p>/g, '')
    .replace(/<pre><code>/g, '<pre><code>')
    .replace(/<\/code><\/pre>/g, '</code></pre>');
};

export const countReplies = (comment) => {
  if (!comment || !comment.replies) return 0;
  
  let count = comment.replies.length;
  comment.replies.forEach(reply => {
    count += countReplies(reply);
  });
  
  return count;
};

