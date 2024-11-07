import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/movieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");  

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

    const fetchMovieCast = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
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
        setCast(data.cast.slice(0, 10)); // Limitar a los primeros 10 actores
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    };

    const fetchMovieTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos`,
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
        const trailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieCast();
    fetchMovieTrailer();
  }, [id]);

  if (!movie || cast.length === 0) {
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
            {/* Botón para redirigir al trailer */}
            {trailerUrl && (
              <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
                <button className="watch-trailer-button">
                  Watch the trailer
                </button>
              </a>
            )}
          </div>

          <div className="movie-detail-info-container">
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
                <span key={genre.id} className="genre-badge">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="movie-detail-overview">
              <h2>Overview</h2>
              <p>{movie.overview}</p>
            </div>

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

        {/* Cast Section */}
        <div className="movie-detail-cast">
          <h2>Cast</h2>
          <div className="cast-list">
            {cast.map((actor) => (
              <div key={actor.id} className="cast-member">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="cast-image"
                />
                <p>{actor.name}</p>
                <p className="character">as {actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
