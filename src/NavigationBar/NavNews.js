import { useNavigate } from "react-router-dom";
import logo from "../hnlogo.png";
import "./NavNews.css";

const NavNews = () => {
  const navigate = useNavigate();

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
      </div>
    </nav>
  );
};

export default NavNews;
