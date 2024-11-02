import React, { useEffect, useState } from "react";
import "../styles/home.css";
import MovieCard from "./MovieCard";

const Carousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie",
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Movie data:", data.results); // For debugging
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="carousel">
      <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
      <div className="carousel-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.slice(0, 10).map((movie) => (
          <div className="d-block" key={movie.id}>
            <MovieCard
              name={movie.original_title}
              overview={movie.overview}
              poster={movie.poster_path}
              voteAverage={movie.vote_average}
              releaseDate={movie.release_date}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
export default Carousel;
