import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStory } from "../services/cacheService";
import mapTime from "./mapTime";
import styles from "../styles/Story.module.css";
import { extractDomain, extractDisplayDomain } from "../utils/urlUtils";

const Story = ({ storyId, storyData }) => {
  const [story, setStory] = useState(storyData || {});

  useEffect(() => {
    // Only fetch if storyData wasn't provided
    if (storyData) {
      setStory(storyData);
      return;
    }

    const fetchStory = async () => {
      try {
        const data = await getStory(storyId);
        if (data && data.url) {
          setStory(data);
        }
      } catch {
        // Fetch failed — component will remain empty
      }
    };

    fetchStory();
  }, [storyId, storyData]);

  return story && story.url ? (
    <article className={styles.storyWrapper} data-testid="story">
      <h2 className={styles.storyTitle}>
        <span className={styles.titleGroup}>
          <i className={`fas fa-sort-up ${styles.upvoteIcon}`} aria-hidden="true" />
          <a href={story.url} rel="noopener noreferrer" target="_blank">
            {story.title}
          </a>
        </span>{" "}
        {extractDomain(story.url) && (
          <span>
            <i className="fas fa-globe" aria-hidden="true" /> (
            <a
              className={styles.domainLink}
              href={`https://${extractDomain(story.url)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {extractDisplayDomain(story.url)}
            </a>
            )
          </span>
        )}
      </h2>
      <div className={styles.storyMeta}>
        <span data-testid="story-points">
          <span className={styles.storyMetaElement}>
            {story.score} points
          </span>
        </span>
        <span data-testid="story-by">
          <span className={styles.storyMetaElement}>
            by
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
        <span data-testid="story-time">
          <span className={styles.storyMetaElement}>posted </span>
          <time dateTime={new Date(story.time * 1000).toISOString()}>
            {mapTime(story.time)} ago
          </time>
        </span>
        <span data-testid="story-comments">
          <span className={styles.storyMetaElement}>
            <Link
              className={styles.commentsLink}
              to={`/item/${story.id}`}
            >
              {story?.kids?.length || 0} comments
            </Link>
          </span>
        </span>
      </div>
    </article>
  ) : null;
};

export default Story;
