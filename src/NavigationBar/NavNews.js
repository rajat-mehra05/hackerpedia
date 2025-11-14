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
            <img className="logo-img" src={logo} alt="HackerPedia logo" />{" "}
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
        </div>
        {onSearchChange && (
          <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
        )}
      </div>

      <div className="git">
        <a
          href="https://www.linkedin.com/in/rajat-mehra-/"
          className="source"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          <i className="fab fa-linkedin icon-link" aria-hidden="true" />{" "}
        </a>
        <a
          href="https://twitter.com/_rajat_mehra_"
          className="source"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter profile"
        >
          <i className="fab fa-twitter icon-link" aria-hidden="true" />{" "}
        </a>
        <a
          href="https://github.com/rajat-mehra05/hacker-news-clone"
          className="source"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
        >
          <i className="fab fa-github icon-link" aria-hidden="true" />
        </a>
        <button
          className="theme-toggle"
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
    </nav>
  );
};

export default NavNews;
