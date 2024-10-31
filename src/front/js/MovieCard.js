import React from "react";

function MovieCard({ name, overview, poster, voteAverage, releaseDate }) {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${poster}`} 
        />
        <div className="rating">⭐ {voteAverage?.toFixed(1)}</div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{name}</h3>
        <p className="movie-date">{new Date(releaseDate).getFullYear()}</p>
        <p className="movie-overview">{overview}</p>
        <button className="watch-btn">Watch Now</button>
      </div>
    </div>
  );
}

export default MovieCard;