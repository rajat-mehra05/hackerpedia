import React, { useState } from 'react';
import mapTime from './mapTime';
import {
  CommentWrapper,
  CommentHeader,
  CommentAuthor,
  CommentTime,
  Separator,
  CollapseLink,
  NextLink,
  Upvote,
  CommentContent,
  CommentFooter,
  ReplyLink,
  CollapsedInfo,
  RepliesContainer,
  DeletedComment,
} from '../styles/CommentStyles';
import { isDeletedComment, getCommentText, sanitizeHtml, countReplies } from '../utils/commentUtils';

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
      <CommentWrapper $depth={depth}>
        <DeletedComment>[deleted]</DeletedComment>
      </CommentWrapper>
    );
  }

  return (
    <CommentWrapper $depth={depth}>
      <CommentHeader>
        <Upvote>▲</Upvote>
        <CommentAuthor
          href={`https://news.ycombinator.com/user?id=${comment.by}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {comment.by}
        </CommentAuthor>
        <CommentTime>
          {mapTime(comment.time)} ago
        </CommentTime>
        <Separator>|</Separator>
        <NextLink href="#" onClick={(e) => e.preventDefault()}>
          next
        </NextLink>
        <CollapseLink href="#" onClick={handleToggle}>
          [{isCollapsed ? '+' : '−'}]
        </CollapseLink>
      </CommentHeader>

      {isCollapsed ? (
        <CollapsedInfo>
          [{replyCount} {replyCount === 1 ? 'more' : 'more'}]
        </CollapsedInfo>
      ) : (
        <>
          <CommentContent
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(getCommentText(comment))
            }}
          />
          <CommentFooter>
            <ReplyLink href="#" onClick={(e) => e.preventDefault()}>
              reply
            </ReplyLink>
          </CommentFooter>
          {comment.replies && comment.replies.length > 0 && (
            <RepliesContainer>
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  depth={depth + 1}
                />
              ))}
            </RepliesContainer>
          )}
        </>
      )}
    </CommentWrapper>
  );
};

export default CommentItem;

