import Container from "@mui/material/Container";
import React, { useEffect, useState, useCallback, useRef, startTransition } from "react";
import styled from "styled-components";
import { List } from "react-window";
import { StoryListSkeleton } from "../styles/SkeletonStyles";
import NavNews from "../NavigationBar/NavNews";
import { getStoryIds, getStory } from "../services/cacheService";
import { STORY_INCREMENT, MAX_STORIES } from "../infiniteScroll/constants";
import "../styles/StoryContainer.css";
import Story from "./Story";

const StyledContainer = styled(Container)`
  background-color: ${props => props.theme.colors.body} !important;
  min-height: 100vh;
  transition: background-color 0.3s ease;
`;

const ROW_HEIGHT = 63;
const URL_PATH_RE = /[/?#]/;

const StoryContainer = (props) => {
  const [storyIds, setStoryIds] = useState([]);
  const [stories, setStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const loadedCountRef = useRef(STORY_INCREMENT);
  const isLoadingMore = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const fetchStories = async () => {
      if (!props.category) return;

      setLoading(true);
      setSearchQuery('');
      setStories([]);
      setFilteredStories([]);
      storiesLengthRef.current = 0;
      loadedCountRef.current = STORY_INCREMENT;
      isLoadingMore.current = false;

      try {
        const data = await getStoryIds(props.category);
        if (!isMounted) return;
        setStoryIds(data);

        const BATCH_SIZE = 10;
        const initialIds = data.slice(0, 30);

        for (let i = 0; i < initialIds.length; i += BATCH_SIZE) {
          const batch = initialIds.slice(i, i + BATCH_SIZE);
          const loaded = await Promise.all(batch.map(id => getStory(id)));
          if (!isMounted) return;

          const valid = loaded.filter(story => story && story.url);
          setStories(prev => {
            const updated = [...prev, ...valid];
            storiesLengthRef.current = updated.length;
            return updated;
          });
          setFilteredStories(prev => [...prev, ...valid]);

          // Hide skeleton after first batch arrives
          if (i === 0) setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
        if (isMounted) {
          setStoryIds([]);
          setStories([]);
          setFilteredStories([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchStories();
    return () => { isMounted = false; };
  }, [props.category]);

  const storyIdsRef = useRef(storyIds);
  storyIdsRef.current = storyIds;
  const storiesLengthRef = useRef(0);
  const searchQueryRef = useRef(searchQuery);
  searchQueryRef.current = searchQuery;

  const loadMoreStories = useCallback(async () => {
    if (isLoadingMore.current) return;
    if (loadedCountRef.current >= MAX_STORIES) return;

    const currentIds = storyIdsRef.current;
    const currentLength = storiesLengthRef.current;
    if (currentLength >= currentIds.length || currentIds.length === 0) return;

    isLoadingMore.current = true;
    const nextCount = Math.min(loadedCountRef.current + STORY_INCREMENT, MAX_STORIES);
    const newIds = currentIds.slice(currentLength, Math.min(nextCount, currentIds.length));

    if (newIds.length === 0) {
      isLoadingMore.current = false;
      return;
    }

    try {
      const loadedStories = await Promise.all(newIds.map(id => getStory(id)));
      const validStories = loadedStories.filter(story => story && story.url);

      const appendNew = (prev) => {
        const existingIds = new Set(prev.map(s => s.id));
        const unique = validStories.filter(story => !existingIds.has(story.id));
        return [...prev, ...unique];
      };

      setStories(prev => {
        const updated = appendNew(prev);
        storiesLengthRef.current = updated.length;
        return updated;
      });
      if (!searchQueryRef.current) {
        setFilteredStories(appendNew);
      }

      loadedCountRef.current = nextCount;
    } catch (error) {
      console.error("Error loading more stories:", error);
    } finally {
      isLoadingMore.current = false;
    }
  }, []);

  const handleRowsRendered = useCallback(({ stopIndex }) => {
    if (stopIndex >= storiesRef.current.length - 5) {
      loadMoreStories();
    }
  }, [loadMoreStories]);

  useEffect(() => {
    if (!searchQuery.trim()) {
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
            .split(URL_PATH_RE)[0]
            .replace('www.', '')
            .toLowerCase()
            .includes(query)
        : false;
      
      return titleMatch || domainMatch;
    });

    startTransition(() => {
      setFilteredStories(filtered);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchQuery, stories]);

  const navRef = useRef(null);
  const [listHeight, setListHeight] = useState(window.innerHeight - 60);

  useEffect(() => {
    const updateHeight = () => {
      const navHeight = navRef.current?.offsetHeight || 50;
      setListHeight(window.innerHeight - navHeight - 10);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const storiesRef = useRef(filteredStories);
  storiesRef.current = filteredStories;

  const StoryRow = useCallback(({ index, style }) => {
    const story = storiesRef.current[index];
    if (!story) return null;
    return (
      <div style={style}>
        <Story storyId={story.id} storyData={story} />
      </div>
    );
  }, []);

  return (
    <StyledContainer maxWidth="lg" component="main">
      <div ref={navRef}>
        <NavNews searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </div>

      {loading ? (
        <StoryListSkeleton height={listHeight} />
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
              <List
                style={{ height: listHeight }}
                rowCount={filteredStories.length}
                rowHeight={ROW_HEIGHT}
                rowComponent={StoryRow}
                rowProps={{}}
                onRowsRendered={handleRowsRendered}
                overscanCount={5}
              />
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
