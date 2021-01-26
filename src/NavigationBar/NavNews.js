import React from "react";
import "./NavNews.css";
import { BrowserRouter as Router, Link } from "react-router-dom";

const NavNews = () => {
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
              />
              <span>Hacker News</span>
            </a>
            <Link
              to={{ pathname: "/newest" }}
              activeClassName="active"
              style={{
                fontSize: "1.12rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              new
            </Link>
            {" | "}
            <Link
              to="/comments"
              activeClassName="active"
              style={{
                fontSize: "1.12rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              comments
            </Link>{" "}
            {" | "}
            <Link
              to="/show"
              activeClassName="active"
              style={{
                fontSize: "1.12rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              show
            </Link>
            {" | "}
            <Link
              to="/ask"
              activeClassName="active"
              style={{
                fontSize: "1.12rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              ask
            </Link>
            {" | "}
            <Link
              to="/jobs"
              activeClassName="active"
              style={{
                fontSize: "1.12rem",
                color: "black",
                textDecoration: "none",
              }}
            >
              jobs
            </Link>
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
