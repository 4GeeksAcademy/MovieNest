import React, { useEffect, useState } from "react";
import "../styles/home.css";
import MovieCard from "./MovieCard";

const Carousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const moviesPerPage = 12;

  async function fetchMovies(page) {
    setIsLoading(true);
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
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // TMDB API limits to 500 pages
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="carousel">
      <h2 className="text-3xl font-bold mb-6">Trending Now</h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Loading...</div>
        </div>
      ) : (
        <>
          <div className="carousel-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.slice(0, moviesPerPage).map((movie) => (
              <div className="d-block" key={movie.id}>
                <MovieCard
                  id={movie.id}
                  name={movie.original_title}
                  overview={movie.overview}
                  poster={movie.poster_path}
                  voteAverage={movie.vote_average}
                  releaseDate={movie.release_date}
                />
              </div>
            ))}
          </div>

          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {currentPage > 1 && (
              <button onClick={() => handlePageChange(1)}>1</button>
            )}

            {currentPage > 3 && <span>...</span>}

            {currentPage > 2 && (
              <button onClick={() => handlePageChange(currentPage - 1)}>
                {currentPage - 1}
              </button>
            )}

            <button className="active">
              {currentPage}
            </button>

            {currentPage < totalPages - 1 && (
              <button onClick={() => handlePageChange(currentPage + 1)}>
                {currentPage + 1}
              </button>
            )}

            {currentPage < totalPages - 2 && <span>...</span>}

            {currentPage < totalPages && (
              <button onClick={() => handlePageChange(totalPages)}>
                {totalPages}
              </button>
            )}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      <a className="btn btn-dark" href="https://buymeacoffee.com/movienest" target="_blank">
        <img alt="Buy me a coffee" src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg" />
        <span className="ms-2">Buy me a coffee</span>
      </a>
    </section>
  );
};

export default Carousel;