import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStory } from "../services/cacheService";
import mapTime from "./mapTime";
import {
  StoryWrapper,
  StoryTitle,
  StoryMeta,
  StoryMetaElement,
  UpvoteIcon,
  DomainLink,
  UserLink,
  CommentsLink,
} from "../styles/StoryStyles";

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
      } catch (error) {
        console.error(`Error fetching story ${storyId}:`, error);
      }
    };

    fetchStory();
  }, [storyId, storyData]);

  return story && story.url ? (
    <StoryWrapper as="article" data-testid="story">
      <StoryTitle as="h2">
        <UpvoteIcon className="fas fa-sort-up" aria-hidden="true" />
        <a href={story.url} rel="noopener noreferrer" target="_blank">
          {story.title}
        </a>{" "}
        <span>
          <i className="fas fa-globe" aria-hidden="true" /> (
          <DomainLink
            href={`https://${
              story.url
                .replace("http://", "")
                .replace("https://", "")
                .split(/[/?#]/)[0]
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {story.url
              .replace("http://", "")
              .replace("https://", "")
              .split(/[/?#]/)[0]
              .replace("www.", "")}
          </DomainLink>
          )
        </span>
      </StoryTitle>
      <StoryMeta>
        <span data-testid="story-points">
          <StoryMetaElement color="#696969">
            {story.score} points
          </StoryMetaElement>
        </span>
        <span data-testid="story-by">
          <StoryMetaElement color="#696969">
            by
            <UserLink
              href={`https://news.ycombinator.com/user?id=${story.by}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {story.by}
            </UserLink>
          </StoryMetaElement>
        </span>
        <span data-testid="story-time">
          <StoryMetaElement color="#696969">posted </StoryMetaElement>
          <time dateTime={new Date(story.time * 1000).toISOString()}>
            {mapTime(story.time)} ago
          </time>
        </span>
        <span data-testid="story-comments">
          <StoryMetaElement color="#696969">
            <CommentsLink
              as={Link}
              to={`/item/${story.id}`}
            >
              {story?.kids?.length || 0} comments
            </CommentsLink>
          </StoryMetaElement>
        </span>
      </StoryMeta>
    </StoryWrapper>
  ) : null;
};

export default Story;
