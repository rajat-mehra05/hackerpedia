import { useNavigate } from "react-router-dom";
import logo from "../hnlogo.png";
import "./NavNews.css";

const NavNews = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="nav">
        <div className="icon">
          <a href="/" style={{ textDecoration: "none" }}>
            <img
              style={{ cursor: "pointer", height: "30px", width: "30px" }}
              src={logo}
              alt="logo"
            />{" "}
            <span>HackerPedia</span>
          </a>
          <span
            className="categories"
            style={{
              fontSize: "1.12rem",
              textDecoration: "none",
            }}
            onClick={() => navigate("/newest")}
          >
            new
          </span>
          {" | "}

          <span
            className="categories"
            to="/best"
            style={{
              fontSize: "1.12rem",
              textDecoration: "none",
            }}
            onClick={() => navigate("/best")}
          >
            best
          </span>
          {" | "}

          <span
            className="categories"
            to="/show"
            style={{
              fontSize: "1.12rem",
              textDecoration: "none",
            }}
            onClick={() => navigate("/show")}
          >
            show
          </span>
          {" | "}

          <span
            className="categories"
            to="/jobs"
            style={{
              fontSize: "1.12rem",
              textDecoration: "none",
            }}
            onClick={() => navigate("/jobs")}
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
          >
            <i className="fab fa-linkedin" style={{ fontSize: "20px" }} />{" "}
          </a>
          <a
            href="https://twitter.com/_rajat_mehra_"
            className="source"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <i className="fab fa-twitter" style={{ fontSize: "20px" }} />{" "}
          </a>
          <a
            href="https://github.com/rajat-mehra05/hacker-news-clone"
            className="source"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <i className="fab fa-github" style={{ fontSize: "20px" }} />
          </a>
        </div>
      </div>
    </>
  );
};

export default NavNews;
