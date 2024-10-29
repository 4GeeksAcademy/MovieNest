import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "/workspaces/MovieNest/src/front/styles/home.css";

export default function Home() {
  return (
    <div className="container">
      <header>
        <div className="logo">MovieNest</div>
        <nav>
          <ul>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>My List</li>
            <a href="/login">Login</a>
          </ul>
        </nav>
      </header>
      <main>
        <div className="carousel">
          <h2>Trending Now</h2>
          <div className="carousel-container">
            <div className="carousel-item">
              <img
                src="https://m.media-amazon.com/images/M/MV5BNzQxNzQxNjk5NV5BMl5BanBnXkFtZTgwNTI4MTU0MzE@._V1_.jpg"
                alt="Movie 1"
              />
            </div>
            <div className="carousel-item">
              <img src="#" alt="Movie 2" />
            </div>
            <div className="carousel-item">
              <img src="#" alt="Movie 3" />
            </div>
            <div className="carousel-item">
              <img src="#" alt="Movie 1" />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 MovieNest. All rights reserved.</p>
      </footer>
    </div>
  );
}
