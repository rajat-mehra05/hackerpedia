import React, { useState } from 'react';
import mapTime from './mapTime';
import styles from '../styles/Comment.module.css';
import { isDeletedComment, getCommentText, sanitizeHtml, countReplies } from '../utils/commentUtils';

const depthClass = (depth) => {
  if (depth >= 4) return styles.depth4;
  return styles[`depth${depth}`] || styles.depth0;
};

const CommentItem = ({ comment, depth = 0 }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!comment) return null;

  const handleToggle = (e) => {
    e.preventDefault();
    setIsCollapsed(!isCollapsed);
  };

  const deleted = isDeletedComment(comment);
  const replyCount = countReplies(comment);

  if (deleted) {
    return (
      <div className={`${styles.commentWrapper} ${depthClass(depth)}`}>
        <div className={styles.deletedComment}>[deleted]</div>
      </div>
    );
  }

  return (
    <div className={`${styles.commentWrapper} ${depthClass(depth)}`}>
      <div className={styles.commentHeader}>
        <span className={styles.upvote}>&#9650;</span>
        <a
          className={styles.commentAuthor}
          href={`https://news.ycombinator.com/user?id=${comment.by}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {comment.by}
        </a>
        <span className={styles.commentTime}>
          {mapTime(comment.time)} ago
        </span>
        <span className={styles.separator}>|</span>
        <button className={styles.nextLink} type="button" aria-label="Jump to next comment">
          next
        </button>
        <button
          className={styles.collapseLink}
          type="button"
          onClick={handleToggle}
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? 'Expand comment' : 'Collapse comment'}
        >
          [{isCollapsed ? '+' : '\u2212'}]
        </button>
      </div>

      {isCollapsed ? (
        <div className={styles.collapsedInfo}>
          [{replyCount} {replyCount === 1 ? 'reply' : 'replies'}]
        </div>
      ) : (
        <>
          <div
            className={styles.commentContent}
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(getCommentText(comment))
            }}
          />
          <div className={styles.commentFooter}>
            <button className={styles.replyLink} type="button" aria-label={`Reply to ${comment.by}`}>
              reply
            </button>
          </div>
          {comment.replies && comment.replies.length > 0 && (
            <div className={styles.repliesContainer}>
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentItem;
