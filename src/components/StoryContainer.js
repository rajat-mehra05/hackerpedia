import React, { useState, useEffect } from "react";
import NavNews from "../NavigationBar/NavNews";
import { getStoryIds } from "../services/hnAPI";
import Story from "./Story";
import { Container } from "@material-ui/core";
import { useInfiniteScroll } from "../infiniteScroll/infiniteScroll";

const StoryContainer = () => {
  const [storyIds, setStoryIds] = useState([]);
  const { count } = useInfiniteScroll();

  useEffect(() => {
    getStoryIds().then((data) => setStoryIds(data));
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <NavNews />

        {storyIds.slice(0, count).map((storyId) => (
          <Story storyId={storyId} />
        ))}
      </Container>
    </>
  );
};

export default StoryContainer;
