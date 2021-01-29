import React, { useState, useEffect } from "react";
import NavNews from "../NavigationBar/NavNews";
import { getStoryIds } from "../services/hnAPI";
import Story from "./Story";
import { Container } from "@material-ui/core";
import { useInfiniteScroll } from "../infiniteScroll/infiniteScroll";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const StoryContainer = (props) => {
  const [storyIds, setStoryIds] = useState([]);
  const { count } = useInfiniteScroll();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    setCategory(props.category);
    getStoryIds(category).then((data) => setStoryIds(data));
  }, [category, props]);

  return (
    <>
      <Container maxWidth="lg">
        <NavNews />
        {loading ? (
          <ClimbingBoxLoader color={"#FC7310"} loading={loading} size={30} />
        ) : (
          storyIds.slice(0, count).map((storyId) => <Story storyId={storyId} />)
        )}
      </Container>
    </>
  );
};

export default StoryContainer;
