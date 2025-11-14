/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { getStory } from "../services/hnAPI";
import mapTime from "./mapTime";
import {
  StoryWrapper,
  StoryTitle,
  StoryMeta,
  StoryMetaElement,
} from "../styles/StoryStyles";

const Story = ({ storyId, url, item }) => {
  const [story, setStory] = useState([]);

  useEffect(() => {
    getStory(storyId).then((data) => data && data.url && setStory(data));
  }, []);

  return story && story.url ? (
    <StoryWrapper as="article" data-testid="story">
      <StoryTitle as="h2">
        <i
          className="fas fa-sort-up"
          style={{
            fontSize: "20px",
            marginTop: "7px",
            padding: "0px",
            marginRight: "5px",
          }}
          aria-hidden="true"
        />
        <a href={story.url} rel="noopener noreferrer" target="_blank">
          {story.title}
        </a>{" "}
        <span>
          <i className="fas fa-globe" aria-hidden="true" /> (
          <a
            href={`https://${
              story.url
                .replace("http://", "")
                .replace("https://", "")
                .split(/[/?#]/)[0]
            }`}
            target="_blank"
            style={{ color: "#828282" }}
            rel="noopener noreferrer"
          >
            {story.url
              .replace("http://", "")
              .replace("https://", "")
              .split(/[/?#]/)[0]
              .replace("www.", "")}
          </a>
          )
        </span>
      </StoryTitle>{" "}
      <StoryMeta>
        <span data-testid="story-points">
          <StoryMetaElement color="#696969">
            {story.score} points
          </StoryMetaElement>
        </span>
        <span data-testid="story-by">
          <StoryMetaElement color="#696969">
            by
            <a
              href={`https://news.ycombinator.com/user?id=${story.by}`}
              target="_blank"
              style={{ fontWeight: "bold", color: "#828282" }}
              rel="noopener noreferrer"
            >
              {story.by}
            </a>|
          </StoryMetaElement>
        </span>
        <span data-testid="story-time">
          <StoryMetaElement color="#696969">posted </StoryMetaElement> {` `}
          <time dateTime={new Date(story.time * 1000).toISOString()}>
            {mapTime(story.time)} ago
          </time>
          |{" "}
        </span>
        <span data-testid="story-comments">
          <StoryMetaElement color="#696969">
            <a
              href={`https://news.ycombinator.com/item?id=${story.id}`}
              target="_blank"
              style={{ fontWeight: "bold", color: "#828282" }}
              rel="noopener noreferrer"
            >
              {story?.kids?.length || 0} comments
            </a>
          </StoryMetaElement>
        </span>
      </StoryMeta>
    </StoryWrapper>
  ) : null;
};

export default Story;
