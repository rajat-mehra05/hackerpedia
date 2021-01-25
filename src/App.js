import React from "react";
import StoryContainer from "./components/StoryContainer";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <StoryContainer />
      </Router>
    </>
  );
};

export default App;
