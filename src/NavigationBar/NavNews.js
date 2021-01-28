import React from "react";
import "./NavNews.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useHistory } from "react-router";

const NavNews = () => {
  const history = useHistory();
  return (
    <>
      <Router>
        <div className="nav">
          <div className="icon">
            <a href="/" style={{ textDecoration: "none" }}>
              <img
                style={{ cursor: "pointer" }}
                src="https://news.ycombinator.com/y18.gif"
                alt="logo"
                height="80%"
              />{" "}
              <span>Hacker News</span>
            </a>
            <span
              className="categories"
              style={{
                fontSize: "1.12rem",
                textDecoration: "none",
              }}
              onClick={() => history.push("/newest")}
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
              onClick={() => history.push("/best")}
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
              onClick={() => history.push("/show")}
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
              onClick={() => history.push("/jobs")}
            >
              jobs
            </span>
          </div>

          <div className="login">
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "500",
                fontSize: "1.2rem",
              }}
            >
              login
            </Link>
          </div>
        </div>
      </Router>
    </>
  );
};

export default NavNews;
