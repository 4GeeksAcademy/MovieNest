import React, { useEffect, useState, useRef } from "react";
import "../styles/home.css";
import MovieCard from "./MovieCard";


const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?page=${page}`,
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
      setMovies((MovieList) => [...MovieList,...data.results]);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
  useEffect(() => {
    

    fetchMovies();
  }, [page]);
const lastMovieOnPageRef = useRef()
                                    // this code works!!! the api is fetching just need to figure out how to get it to display properly. also limit the requests.
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       const lastEntry = entries[0];
  //       if (lastEntry.isIntersecting) {;
  //         setPage((prevPage) => prevPage + 1);
  //       }
  //     },
  //     { rootMargin: '10px' }
  //   );

  //   // Cleanup function to unobserve the current last movie card
  //   const currentElement = lastMovieOnPageRef.current;
  //   if (currentElement) {
  //     observer.observe(currentElement);
  //   }

  //   return () => {
  //     if (currentElement) {
  //       observer.unobserve(currentElement);
  //     }
  //   };
  // }, [movies]);

  return (
    <section className="carousel">
      <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
      <div className="carousel-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.slice(0, 10).map((movie) => (
          <div className="d-block" key={movie.id}>
            <MovieCard
              id={movie.id}
              Ref={lastMovieOnPageRef}
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
