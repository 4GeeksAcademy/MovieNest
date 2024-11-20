import React, { useEffect, useState } from "react";
import styles from "/workspaces/MovieNest/src/front/styles/home.css";
import Carousel from "./Carousel";
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom"; // Import both useNavigate and Link
import Favorites from "./Favorite";

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    async function fetchMoviePoster() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?page=1`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        const posterPath = data.results[0]?.poster_path;
        if (posterPath) {
          setBackgroundImage(`https://image.tmdb.org/t/p/original${posterPath}`);
        }
      } catch (error) {
        console.error("Error fetching movie poster:", error);
      }
    }

    fetchMoviePoster();
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        {/* Overlay oscuro */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)', zIndex: 1
        }}></div>

        <section className="welcome-section" style={{ position: 'relative', zIndex: 2 }}>
          <h1>Welcome to MovieNest</h1>
          <p>Discover trending movies and shows, tailored just for you!</p>
        </section>

        <section className="carousel" style={{ position: 'relative', zIndex: 2 }}>
          <Carousel />
        </section>
      </main>
      <footer>
        <p>&copy; 2024 MovieNest. All rights reserved.</p>
      </footer>
    </>
  );
}