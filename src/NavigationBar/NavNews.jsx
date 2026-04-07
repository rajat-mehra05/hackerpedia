import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Search from "../components/Search";
import logo from "../hnlogo.png";
import "./NavNews.css";

const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  return (
    <button
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`} aria-hidden="true" />
    </button>
  );
};

const NavNews = ({ searchQuery, onSearchChange }) => {
  const navigate = useNavigate();

  return (
    <nav className="nav" aria-label="Main navigation">
      <div className="nav-main">
        <div className="icon">
          <a
            className="logo-link"
            href="/"
            onClick={(e) => { e.preventDefault(); navigate("/"); }}
          >
            <img className="logo-img" src={logo} alt="HackerPedia logo" />
            <h1 className="site-title">HackerPedia</h1>
          </a>
          <ThemeToggle className="theme-toggle-mobile" />
          <div className="categories-row">
            <button className="categories" type="button" onClick={() => navigate("/newest")}>
              new
            </button>
            {" | "}
            <button className="categories" type="button" onClick={() => navigate("/best")}>
              best
            </button>
            {" | "}
            <button className="categories" type="button" onClick={() => navigate("/show")}>
              show
            </button>
            {" | "}
            <button className="categories" type="button" onClick={() => navigate("/jobs")}>
              jobs
            </button>
          </div>
        </div>
        {onSearchChange && (
          <div className="search-theme-wrapper">
            <Search searchQuery={searchQuery} onSearchChange={onSearchChange} />
          </div>
        )}
      </div>
      <ThemeToggle className="theme-toggle-desktop" />
    </nav>
  );
};

export default NavNews;
