import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "/workspaces/MovieNest/src/front/styles/home.css";
import Carousel from "./Carousel";
import { useAuth } from "./AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  console.log("Username:", username);
  return (
    <>
      <header>
        <div className="logo">MovieNest</div>
        <div>
          {isAuthenticated ? <h2>Welcome, {username}!</h2> : <h2></h2>}

          {isAuthenticated ? (
            <button className="btn btn-danger" onClick={handleLogout}>
              Click to logout
            </button>
          ) : (
            <h2></h2>
          )}
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tvshows">TV Shows</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/mylist">My List</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="welcome-section">
          <h1>Welcome to MovieNest</h1>
          <p>Discover trending movies and shows, tailored just for you!</p>

          {!isAuthenticated && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="login-button"
              >
                Click to Login
              </button>
              <p>
                Don't have an account yet? <Link to="/signup">Signup now</Link>
              </p>
            </>
          )}
        </section>

        <section className="carousel">
          <Carousel />
        </section>
      </main>

      <footer>
        <p>&copy; 2024 MovieNest. All rights reserved.</p>
      </footer>
    </>
  );
}
