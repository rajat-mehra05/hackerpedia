import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useInfiniteScroll } from "../infiniteScroll/infiniteScroll";
import NavNews from "../NavigationBar/NavNews";
import { getStoryIds, getStory } from "../services/hnAPI";
import "../styles/StoryContainer.css";
import Story from "./Story";

const StyledContainer = styled(Container)`
  background-color: ${props => props.theme.colors.body} !important;
  min-height: 100vh;
  transition: background-color 0.3s ease;
`;

const StoryContainer = (props) => {
  const [storyIds, setStoryIds] = useState([]);
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { count } = useInfiniteScroll();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      if (props.category) {
        setLoading(true);
        setSearchQuery('');
        try {
          const data = await getStoryIds(props.category);
          setStoryIds(data);
          
          const storyPromises = data.slice(0, 30).map(id => getStory(id));
          const loadedStories = await Promise.all(storyPromises);
          const validStories = loadedStories.filter(story => story && story.url);
          setStories(validStories);
          setFilteredStories(validStories);
        } catch (error) {
          console.error("Error fetching stories:", error);
          setStoryIds([]);
          setStories([]);
          setFilteredStories([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStories();
  }, [props.category]);

  useEffect(() => {
    const loadMoreStories = async () => {
      if (stories.length < count && stories.length < storyIds.length) {
        const startIndex = stories.length;
        const endIndex = Math.min(count, storyIds.length);
        const newIds = storyIds.slice(startIndex, endIndex);
        
        try {
          const storyPromises = newIds.map(id => getStory(id));
          const loadedStories = await Promise.all(storyPromises);
          const validStories = loadedStories.filter(story => story && story.url);
          
          setStories(prev => [...prev, ...validStories]);
          if (!searchQuery) {
            setFilteredStories(prev => [...prev, ...validStories]);
          }
        } catch (error) {
          console.error("Error loading more stories:", error);
        }
      }
    };

    loadMoreStories();
  }, [count, storyIds, stories.length, searchQuery]);

  useEffect(() => {
    if (!searchQuery || searchQuery.trim() === '') {
      setFilteredStories(stories);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const filtered = stories.filter((story) => {
      const titleMatch = story.title?.toLowerCase().includes(query);
      const domainMatch = story.url
        ? story.url
            .replace('http://', '')
            .replace('https://', '')
            .split(/[/?#]/)[0]
            .replace('www.', '')
            .toLowerCase()
            .includes(query)
        : false;
      
      return titleMatch || domainMatch;
    });

    setFilteredStories(filtered);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchQuery, stories]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <StyledContainer maxWidth="lg" component="main">
      <NavNews searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {loading ? (
        <div className="load" role="status" aria-live="polite">
          <ClimbingBoxLoader color={"#FC7310"} loading={loading} size={30} />
          <span className="sr-only">Loading stories...</span>
        </div>
      ) : (
        <>
          {searchQuery && filteredStories.length > 0 && (
            <div className="search-results-info" role="status" aria-live="polite">
              Found {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'}
              {searchQuery && ` matching "${searchQuery}"`}
            </div>
          )}
          <section aria-label="Stories">
            {filteredStories.length > 0 ? (
              filteredStories.map((story) => (
                <Story key={story.id} storyId={story.id} storyData={story} />
              ))
            ) : searchQuery ? (
              <div className="no-results">
                <p>No stories found matching "{searchQuery}"</p>
                <p>Try a different search term or clear the search.</p>
              </div>
            ) : null}
          </section>
        </>
      )}
    </StyledContainer>
  );
};

export default StoryContainer;
