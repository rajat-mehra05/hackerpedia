import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { useInfiniteScroll } from "../infiniteScroll/infiniteScroll";
import NavNews from "../NavigationBar/NavNews";
import { getStoryIds } from "../services/hnAPI";
import "../styles/StoryContainer.css";
import Story from "./Story";

const StoryContainer = (props) => {
  const [storyIds, setStoryIds] = useState([]);
  const { count } = useInfiniteScroll();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStories = async () => {
      if (props.category) {
        console.log("Fetching stories for category:", props.category);
        setLoading(true);
        try {
          const data = await getStoryIds(props.category);
          setStoryIds(data);
        } catch (error) {
          console.error("Error fetching stories:", error);
          setStoryIds([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStories();
  }, [props.category]);

  return (
    <Container maxWidth="lg" component="main">
      <NavNews />

      {loading ? (
        <div className="load" role="status" aria-live="polite">
          <ClimbingBoxLoader color={"#FC7310"} loading={loading} size={30} />
          <span className="sr-only">Loading stories...</span>
        </div>
      ) : (
        <section aria-label="Stories">
          {storyIds
            .slice(0, count)
            .map((storyId) => (
              <Story key={storyId} storyId={storyId} />
            ))}
        </section>
      )}
    </Container>
  );
};

export default StoryContainer;
