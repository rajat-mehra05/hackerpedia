import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import StoryContainer from "./components/StoryContainer";
import CommentPage from "./pages/CommentPage";

const App = () => {
  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route
            path="/"
            element={<StoryContainer category="topstories" />}
          />
          <Route
            path="/show"
            element={<StoryContainer category="showstories" />}
          />
          <Route
            path="/newest"
            element={<StoryContainer category="newstories" />}
          />
          <Route
            path="/best"
            element={<StoryContainer category="beststories" />}
          />
          <Route
            path="/jobs"
            element={<StoryContainer category="jobstories" />}
          />
          <Route
            path="/item/:id"
            element={<CommentPage />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
