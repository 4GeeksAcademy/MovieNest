import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/movieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}`,
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
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="movie-detail-container">
        <div className="movie-detail-content">

          <div className="movie-detail-image">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </div>


          <div>
            <h1 className="movie-detail-title">{movie.title}</h1>

            <div className="movie-detail-info">
              <span>{movie.release_date?.split('-')[0]}</span>
              <span>•</span>
              <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
              <span>•</span>
              <span>{movie.vote_average?.toFixed(1)} Rating</span>
            </div>


            <div className="movie-detail-genres">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="genre-badge"
                >
                  {genre.name}
                </span>
              ))}
            </div>


            <div className="movie-detail-overview">
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>

            {/* Additional Details */}
            <div className="additional-details">
              <div>
                <p>Status</p>
                <p>{movie.status}</p>
              </div>
              <div>
                <p>Original Language</p>
                <p>{movie.original_language?.toUpperCase()}</p>
              </div>
              {movie.budget > 0 && (
                <div>
                  <p>Budget</p>
                  <p>${movie.budget?.toLocaleString()}</p>
                </div>
              )}
              <div>
                <p>Vote Count</p>
                <p>{movie.vote_count?.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
