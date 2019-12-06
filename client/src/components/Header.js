import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <h1 className="app-title">
            Uber <span className="change-color">Recipes</span>
          </h1>
        </Link>

        <div className="nav-bar">
          <div className="nav-item">
            <Link to="/">Home</Link>
          </div>

          <div className="nav-item">
            <Link to="/about">Contact Us</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
