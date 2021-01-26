import React from "react";
import StoryContainer from "./components/StoryContainer";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Route
          exact
          path="/"
          render={(props) => <StoryContainer category={`showstories`} />}
        />
        <Route
          exact
          path="/newest"
          render={(props) => <StoryContainer category={`newstories`} />}
        />
        <Route
          exact
          path="/ask"
          render={(props) => <StoryContainer category={`askstories`} />}
        />

        <Route
          exact
          path="/jobs"
          render={(props) => <StoryContainer category={`jobstories`} />}
        />
      </Router>
    </>
  );
};

export default App;
