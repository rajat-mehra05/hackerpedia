import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CommentPageSkeleton } from '../styles/SkeletonStyles';
import { getStory, getCommentsRecursive } from '../services/cacheService';
import NavNews from '../NavigationBar/NavNews';
import CommentList from '../components/CommentList';
import mapTime from '../components/mapTime';
import styles from './CommentPage.module.css';
import { extractDisplayDomain } from '../utils/urlUtils';

const CommentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const storyData = await getStory(id);

        if (!storyData) {
          setError('Story not found');
          setLoading(false);
          return;
        }

        setStory(storyData);
        setLoading(false);

        if (storyData.kids && storyData.kids.length > 0) {
          setCommentsLoading(true);
          const commentsData = await getCommentsRecursive(storyData.kids, 10, 0, id);
          setComments(commentsData);
          setCommentsLoading(false);
        } else {
          setCommentsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching story:', err);
        setError('Failed to load story');
        setLoading(false);
        setCommentsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <main className={styles.container}>
        <NavNews />
        <CommentPageSkeleton />
      </main>
    );
  }

  if (error || !story) {
    return (
      <main className={styles.container}>
        <NavNews />
        <div className={styles.breadcrumb}>
          <button onClick={handleBack} aria-label="Go back">
            &larr; Back
          </button>
        </div>
        <div className={styles.errorMessage}>{error || 'Story not found'}</div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <NavNews />

      <div className={styles.breadcrumb}>
        <button onClick={handleBack} aria-label="Go back">
          &larr; Back
        </button>
      </div>

      <div className={styles.storyHeader}>
        {story.url ? (
          <a
            className={styles.storyLink}
            href={story.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {story.title}
          </a>
        ) : (
          <span className={styles.storyLink}>{story.title}</span>
        )}
        {story.url && (
          <div className={styles.domainWrapper}>
            <a
              className={styles.domainLink}
              href={story.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              ({extractDisplayDomain(story.url)})
            </a>
          </div>
        )}
        <div className={styles.storyMeta}>
          <span>
            <span className={styles.storyMetaElement}>
              {story.score} points
            </span>
          </span>
          <span>
            <span className={styles.storyMetaElement}>
              by{" "}
              <a
                className={styles.userLink}
                href={`https://news.ycombinator.com/user?id=${story.by}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {story.by}
              </a>
            </span>
          </span>
          <span>
            <span className={styles.storyMetaElement}>
              {mapTime(story.time)} ago
            </span>
          </span>
          <span>
            <span className={styles.storyMetaElement}>
              {story.descendants || 0} comments
            </span>
          </span>
        </div>
      </div>

      {story.descendants > 0 && (
        <div className={styles.commentCount}>
          {story.descendants} {story.descendants === 1 ? 'comment' : 'comments'}
        </div>
      )}

      <CommentList comments={comments} loading={commentsLoading} />
    </main>
  );
};

export default CommentPage;
