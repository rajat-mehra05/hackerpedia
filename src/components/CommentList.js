import React from 'react';
import CommentItem from './CommentItem';
import {
  CommentListWrapper,
  LoadingComment,
  NoComments,
} from '../styles/CommentStyles';
import { ClimbingBoxLoader } from 'react-spinners';

const CommentList = ({ comments, loading }) => {
  if (loading) {
    return (
      <CommentListWrapper>
        <LoadingComment>
          <ClimbingBoxLoader color="#FC7310" loading={true} size={30} />
        </LoadingComment>
      </CommentListWrapper>
    );
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

