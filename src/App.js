import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import StoryContainer from "./components/StoryContainer";

const App = () => {
  return (
    <>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route
            path="/"
            element={<StoryContainer category={`topstories`} />}
          />
          <Route
            path="/show"
            element={<StoryContainer category={`showstories`} />}
          />
          <Route
            path="/newest"
            element={<StoryContainer category={`newstories`} />}
          />
          <Route
            path="/best"
            element={<StoryContainer category={`beststories`} />}
          />
          <Route
            path="/jobs"
            element={<StoryContainer category={`jobstories`} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
