import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="logo">MovieNest</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tv-shows">TV Shows</Link></li>
          <li><Link to="/movies">Movies</Link></li>
          <li><Link to="/my-list">My List</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;