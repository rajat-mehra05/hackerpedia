import React from 'react';
import CommentItem from './CommentItem';
import styles from '../styles/Comment.module.css';
import { CommentListSkeleton } from '../styles/SkeletonComponents';

const CommentList = ({ comments, loading }) => {
  if (loading) {
    return <CommentListSkeleton />;
  }

  if (!comments || comments.length === 0) {
    return (
      <div className={styles.commentListWrapper}>
        <div className={styles.noComments}>No comments yet.</div>
      </div>
    );
  }

  return (
    <div className={styles.commentListWrapper}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} depth={0} />
      ))}
    </div>
  );
};

export default CommentList;
