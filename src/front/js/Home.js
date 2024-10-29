import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "/workspaces/MovieNest/src/front/styles/home.css";// Link your CSS file here for styling

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="logo">MovieNest</div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tvshows">TV Shows</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/mylist">My List</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="welcome-section">
          <h1>Welcome to MovieNest</h1>
          <p>Discover trending movies and shows, tailored just for you!</p>
          <button onClick={() => navigate("/login")} className="login-button">
            Click to Login
          </button>
          <p>
            Don't have an account yet? <Link to="/signup">Signup now</Link>
          </p>
        </section>

        <section className="carousel">
          <h2>Trending Now</h2>
          <div className="carousel-container">
            <div className="carousel-item">
              <img src="image1.jpg" alt="Movie 1" />
              <p>Movie Title 1</p>
            </div>
            <div className="carousel-item">
              <img src="image2.jpg" alt="Movie 2" />
              <p>Movie Title 2</p>
            </div>
            <div className="carousel-item">
              <img src="image3.jpg" alt="Movie 3" />
              <p>Movie Title 3</p>
            </div>
            {/* Add more carousel items as needed */}
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 MovieNest. All rights reserved.</p>
      </footer>
    </>
  );
}


