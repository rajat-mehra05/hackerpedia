import React, { useState, useEffect } from "react";
import NavNews from "../NavigationBar/NavNews";
import { getStoryIds } from "../services/hnAPI";
import Story from "./Story";
import { Container } from "@material-ui/core";
import { useInfiniteScroll } from "../infiniteScroll/infiniteScroll";

const StoryContainer = (props) => {
  const [storyIds, setStoryIds] = useState([]);
  const { count } = useInfiniteScroll();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    setCategory(props.category);
    getStoryIds(category).then((data) => setStoryIds(data));
  }, [category, props]);

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
