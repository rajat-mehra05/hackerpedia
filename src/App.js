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
          render={(props) => <StoryContainer category={`topstories`} />}
        />
        <Route
          exact
          path="/show"
          render={(props) => <StoryContainer category={`showstories`} />}
        />
        <Route
          exact
          path="/newest"
          render={(props) => <StoryContainer category={`newstories`} />}
        />

        <Route
          exact
          path="/best"
          render={(props) => <StoryContainer category={`beststories`} />}
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
