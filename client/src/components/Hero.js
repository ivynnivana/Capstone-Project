import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <Link to="/">
      <div className="overlay">
        <div className="hero-image" id="header1">
          <div className="hero-overlay"></div>
          <p className="hero-slogan">
            Your Favorite Recipes <br />
            Delivered Fast
          </p>
        </div>
      </div>
    </Link>
  );
}
