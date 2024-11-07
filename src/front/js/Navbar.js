import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; 
import "../styles/navbar.css"; 

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("You have logged out.");
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="logo">
       <h2>
        <Link to="/">MovieNest</Link>
        </h2>
      </div>
      
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login" className="login-button">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="signup-button">Signup</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
