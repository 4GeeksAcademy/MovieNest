import React, { useEffect, useState } from "react";
import "./Carousel.css";

const apiKey = "784eff8e954aa3459873a6873f92c196";

function Carousel() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <section className="carousel">
      <h2>Trending Now</h2>
      <div className="carousel-container">
        {movies.map(movie => (
          <div className="carousel-item" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Carousel;
