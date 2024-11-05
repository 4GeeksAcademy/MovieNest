// src/components/MovieCard.js
import React from "react";
import { useNavigate } from "react-router-dom";

function MovieCard({ id, name, overview, poster, voteAverage, releaseDate }) {
  const navigate = useNavigate();
  const fallbackImage = "/api/placeholder/300/450";

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster}` || fallbackImage}
          onError={(e) => {
            e.target.src = fallbackImage;
          }}
        />
        <div className="rating">⭐{voteAverage?.toFixed(1) || "N/A"}</div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{name}</h3>
        <p className="movie-date">{new Date(releaseDate).getFullYear()}</p>
        <p className="movie-overview">{overview}</p>
        <button
          className="watch-btn"
          onClick={() => navigate(`/movie/${id}`)} 
        >
          Learn more
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
