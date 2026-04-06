import React from 'react';
import CommentItem from './CommentItem';
import {
  CommentListWrapper,
  NoComments,
} from '../styles/CommentStyles';
import { CommentListSkeleton } from '../styles/SkeletonStyles';

const CommentList = ({ comments, loading }) => {
  if (loading) {
    return <CommentListSkeleton />;
  }

  if (!comments || comments.length === 0) {
    return (
      <CommentListWrapper>
        <NoComments>No comments yet.</NoComments>
      </CommentListWrapper>
    );
  }

  return (
    <CommentListWrapper>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} depth={0} />
      ))}
    </CommentListWrapper>
  );
};

export default CommentList;

