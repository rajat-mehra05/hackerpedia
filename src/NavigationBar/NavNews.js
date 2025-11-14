import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Search from "../components/Search";
import logo from "../hnlogo.png";
import "./NavNews.css";

const NavNews = ({ searchQuery, onSearchChange }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleKeyDown = (event, path) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate(path);
    }
  };

  const handleLogoClick = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const handleLogoKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate("/");
    }
  };

  return (
    <nav className="nav">
      <div className="nav-main">
        <div className="icon">
          <span
            className="logo-link"
            role="button"
            tabIndex={0}
            onClick={handleLogoClick}
            onKeyDown={handleLogoKeyDown}
          >
            <img className="logo-img" src={logo} alt="HackerPedia logo" />
            <span>HackerPedia</span>
          </span>
          <span
            className="categories"
            role="button"
            tabIndex={0}
            onClick={() => handleNavigate("/newest")}
            onKeyDown={(e) => handleKeyDown(e, "/newest")}
          >
            new
          </span>
          {" | "}

          <span
            className="categories"
            role="button"
            tabIndex={0}
            onClick={() => handleNavigate("/best")}
            onKeyDown={(e) => handleKeyDown(e, "/best")}
          >
            best
          </span>
          {" | "}

          <span
            className="categories"
            role="button"
            tabIndex={0}
            onClick={() => handleNavigate("/show")}
            onKeyDown={(e) => handleKeyDown(e, "/show")}
          >
            show
          </span>
          {" | "}

          <span
            className="categories"
            role="button"
            tabIndex={0}
            onClick={() => handleNavigate("/jobs")}
            onKeyDown={(e) => handleKeyDown(e, "/jobs")}
          >
            jobs
          </span>
          {!onSearchChange && (
            <button
              className="theme-toggle theme-toggle-mobile-no-search"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <i 
                className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`} 
                aria-hidden="true"
              />
            </button>
          )}
        </div>
        {onSearchChange && (
          <div className="search-theme-wrapper">
            <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
            <button
              className="theme-toggle theme-toggle-mobile-with-search"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <i 
                className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`} 
                aria-hidden="true"
              />
            </button>
          </div>
        )}
      </div>
      <button
        className="theme-toggle theme-toggle-desktop"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <i 
          className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`} 
          aria-hidden="true"
        />
      </button>
    </nav>
  );
};

export default NavNews;
