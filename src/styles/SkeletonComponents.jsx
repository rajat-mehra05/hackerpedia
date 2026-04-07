import React from 'react';
import styles from './Skeleton.module.css';
import storyStyles from './Story.module.css';

const ShimmerLine = ({ width, height, style }) => (
  <div
    className={styles.shimmerLine}
    style={{ width: width || '100%', height: height || '12px', ...style }}
  />
);

// ─── Story Card Skeleton ───
// Reuses actual Story.module.css classes so layout matches exactly

const SkeletonStoryCard = () => (
  <div className={storyStyles.storyWrapper}>
    <div className={storyStyles.storyTitle}>
      <ShimmerLine width="14px" height="20px" style={{ borderRadius: '2px', flexShrink: 0 }} />
      <ShimmerLine width="60%" height="1rem" />
      <ShimmerLine width="120px" height="0.85rem" />
    </div>
    <div className={storyStyles.storyMeta}>
      <span><ShimmerLine width="55px" height="0.756rem" /></span>
      <span><ShimmerLine width="70px" height="0.756rem" /></span>
      <span><ShimmerLine width="60px" height="0.756rem" /></span>
      <span><ShimmerLine width="75px" height="0.756rem" /></span>
    </div>
  </div>
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

const SkeletonStoryHeader = () => (
  <div className={styles.storyHeaderWrapper}>
    <ShimmerLine width="75%" height="1.1rem" style={{ marginBottom: '12px' }} />
    <ShimmerLine width="150px" height="0.85rem" style={{ marginBottom: '14px' }} />
    <div className={styles.headerMetaRow}>
      <ShimmerLine width="55px" height="0.756rem" />
      <ShimmerLine width="70px" height="0.756rem" />
      <ShimmerLine width="60px" height="0.756rem" />
      <ShimmerLine width="75px" height="0.756rem" />
    </div>
  </div>
);

// ─── Comment Skeleton ───

const skeletonDepthClass = (depth) => {
  if (depth >= 2) return styles.skeletonDepth2;
  return styles[`skeletonDepth${depth}`] || styles.skeletonDepth0;
};

const SkeletonCommentItem = ({ depth = 0, lines = 3 }) => (
  <div className={`${styles.commentSkeletonWrapper} ${skeletonDepthClass(depth)}`}>
    <div className={styles.commentHeaderRow}>
      <ShimmerLine width="10px" height="10px" />
      <ShimmerLine width="60px" height="10px" />
      <ShimmerLine width="50px" height="10px" />
    </div>
    <div className={styles.commentBodyRow}>
      {Array.from({ length: lines }).map((_, i) => {
        const isFirst = i === 0;
        const isLast = i === lines - 1;
        const width = isFirst ? '100%' : isLast ? '50%' : '85%';
        return <ShimmerLine key={i} width={width} height="10px" />;
      })}
    </div>
    <ShimmerLine width="30px" height="9px" />
  </div>
);

export const CommentListSkeleton = () => (
  <div style={{ padding: '10px 0' }} role="status" aria-live="polite" aria-label="Loading comments...">
    <SkeletonCommentItem depth={0} lines={3} />
    <SkeletonCommentItem depth={1} lines={2} />
    <SkeletonCommentItem depth={1} lines={4} />
    <SkeletonCommentItem depth={0} lines={2} />
    <SkeletonCommentItem depth={0} lines={3} />
  </div>
);

export const CommentPageSkeleton = () => (
  <>
    <SkeletonStoryHeader />
    <CommentListSkeleton />
  </>
);
