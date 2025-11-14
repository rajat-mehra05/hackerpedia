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

  return (
    <nav className="nav">
      <div className="icon">
        <a href="/" style={{ textDecoration: "none" }}>
          <img
            style={{ cursor: "pointer", height: "30px", width: "30px" }}
            src={logo}
            alt="HackerPedia logo"
          />{" "}
          <span>HackerPedia</span>
        </a>
        <span
          className="categories"
          role="button"
          tabIndex={0}
          style={{
            fontSize: "1.12rem",
            textDecoration: "none",
          }}
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
          style={{
            fontSize: "1.12rem",
            textDecoration: "none",
          }}
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
          style={{
            fontSize: "1.12rem",
            textDecoration: "none",
          }}
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
          style={{
            fontSize: "1.12rem",
            textDecoration: "none",
          }}
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
          style={{ textDecoration: "none" }}
          aria-label="LinkedIn profile"
        >
          <i className="fab fa-linkedin" style={{ fontSize: "20px" }} aria-hidden="true" />{" "}
        </a>
        <a
          href="https://twitter.com/_rajat_mehra_"
          className="source"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
          aria-label="Twitter profile"
        >
          <i className="fab fa-twitter" style={{ fontSize: "20px" }} aria-hidden="true" />{" "}
        </a>
        <a
          href="https://github.com/rajat-mehra05/hacker-news-clone"
          className="source"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
          aria-label="GitHub repository"
        >
          <i className="fab fa-github" style={{ fontSize: "20px" }} aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
};

export default NavNews;
