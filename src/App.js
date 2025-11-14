import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { lightTheme, darkTheme } from "./styles/themes";
import StoryContainer from "./components/StoryContainer";
import CommentPage from "./pages/CommentPage";

const ThemedApp = () => {
  const { theme } = useTheme();
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;

  return (
    <StyledThemeProvider theme={currentTheme}>
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
          <Route
            path="/item/:id"
            element={<CommentPage />}
          />
        </Routes>
      </Router>
    </StyledThemeProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
};

export default App;
