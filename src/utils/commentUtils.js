import DOMPurify from 'dompurify';

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

  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'a', 'pre', 'code', 'i', 'b', 'em', 'strong'],
    ALLOWED_ATTR: ['href'],
    FORCE_BODY: true,
  });
  return clean.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');
};

export const countReplies = (comment) => {
  if (!comment || !comment.replies) return 0;
  
  let count = comment.replies.length;
  comment.replies.forEach(reply => {
    count += countReplies(reply);
  });
  
  return count;
};

