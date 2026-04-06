import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  StoryWrapper,
  StoryTitle,
  StoryMeta,
} from './StoryStyles';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const ShimmerLine = styled.div`
  width: ${props => props.$width || '100%'};
  height: ${props => props.$height || '12px'};
  border-radius: 3px;
  background: linear-gradient(
    90deg,
    ${props => props.theme.colors.shimmerBase} 25%,
    ${props => props.theme.colors.shimmerHighlight} 50%,
    ${props => props.theme.colors.shimmerBase} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`;

// ─── Story Card Skeleton ───
// Reuses actual StoryWrapper, StoryTitle, StoryMeta so layout matches exactly

const SkeletonStoryCard = () => (
  <StoryWrapper as="div">
    <StoryTitle as="div">
      <ShimmerLine $width="14px" $height="20px" style={{ borderRadius: '2px', flexShrink: 0 }} />
      <ShimmerLine $width="60%" $height="1rem" />
      <ShimmerLine $width="120px" $height="0.85rem" />
    </StoryTitle>
    <StoryMeta as="div">
      <span><ShimmerLine $width="55px" $height="0.756rem" /></span>
      <span><ShimmerLine $width="70px" $height="0.756rem" /></span>
      <span><ShimmerLine $width="60px" $height="0.756rem" /></span>
      <span><ShimmerLine $width="75px" $height="0.756rem" /></span>
    </StoryMeta>
  </StoryWrapper>
);

const SKELETON_CARD_HEIGHT = 50;

export const StoryListSkeleton = ({ height }) => {
  const count = height ? Math.ceil(height / SKELETON_CARD_HEIGHT) : 15;
  return (
    <div role="status" aria-live="polite" aria-label="Loading stories...">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonStoryCard key={i} />
      ))}
    </div>
  );
};

// ─── Comment Page Skeleton (story header + comments) ───

const StoryHeaderWrapper = styled.div`
  background-color: ${props => props.theme.colors.cardBackground};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 4px;
`;

const SpacedLine = styled(ShimmerLine)`
  margin-bottom: ${props => props.$mb || '0'};
`;

const HeaderMetaRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const SkeletonStoryHeader = () => (
  <StoryHeaderWrapper>
    <SpacedLine $width="75%" $height="1.1rem" $mb="12px" />
    <SpacedLine $width="150px" $height="0.85rem" $mb="14px" />
    <HeaderMetaRow>
      <ShimmerLine $width="55px" $height="0.756rem" />
      <ShimmerLine $width="70px" $height="0.756rem" />
      <ShimmerLine $width="60px" $height="0.756rem" />
      <ShimmerLine $width="75px" $height="0.756rem" />
    </HeaderMetaRow>
  </StoryHeaderWrapper>
);

// ─── Comment Skeleton ───

const CommentSkeletonWrapper = styled.div`
  margin-left: ${props => {
    const depth = props.$depth || 0;
    if (depth === 0) return '0px';
    if (depth === 1) return '40px';
    return '80px';
  }};
  margin-top: 8px;

  @media (max-width: 768px) {
    margin-left: ${props => {
      const depth = props.$depth || 0;
      if (depth === 0) return '0px';
      if (depth === 1) return '15px';
      return '32px';
    }};
  }
`;

const CommentHeaderRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentBodyRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 6px;
`;

const SkeletonCommentItem = ({ $depth = 0, lines = 3 }) => (
  <CommentSkeletonWrapper $depth={$depth}>
    <CommentHeaderRow>
      <ShimmerLine $width="10px" $height="10px" />
      <ShimmerLine $width="60px" $height="10px" />
      <ShimmerLine $width="50px" $height="10px" />
    </CommentHeaderRow>
    <CommentBodyRow>
      {Array.from({ length: lines }).map((_, i) => {
        const isFirst = i === 0;
        const isLast = i === lines - 1;
        const width = isFirst ? '100%' : isLast ? '50%' : '85%';
        return <ShimmerLine key={i} $width={width} $height="10px" />;
      })}
    </CommentBodyRow>
    <ShimmerLine $width="30px" $height="9px" />
  </CommentSkeletonWrapper>
);

export const CommentListSkeleton = () => (
  <div style={{ padding: '10px 0' }} role="status" aria-live="polite" aria-label="Loading comments...">
    <SkeletonCommentItem $depth={0} lines={3} />
    <SkeletonCommentItem $depth={1} lines={2} />
    <SkeletonCommentItem $depth={1} lines={4} />
    <SkeletonCommentItem $depth={0} lines={2} />
    <SkeletonCommentItem $depth={0} lines={3} />
  </div>
);

export const CommentPageSkeleton = () => (
  <>
    <SkeletonStoryHeader />
    <CommentListSkeleton />
  </>
);
