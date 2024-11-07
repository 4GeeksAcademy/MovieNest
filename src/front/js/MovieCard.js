import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; 

function MovieCard({ id, name, overview, poster, voteAverage, releaseDate }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false); 

  const fallbackImage = "/api/placeholder/300/450";

  useEffect(() => {
    if (isAuthenticated) {
     
      async function checkFavorite() {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/favorites`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (response.ok) {
            const favorites = await response.json();
            const isFav = favorites.some((favorite) => favorite.movie_id === id);
            setIsFavorite(isFav);
          }
        } catch (error) {
          console.error("Error checking favorite:", error);
        }
      }
      checkFavorite();
    }
  }, [isAuthenticated, id]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) return; 

    try {
      const response = isFavorite
        ? await fetch(`${process.env.BACKEND_URL}/favorites/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        : await fetch(`${process.env.BACKEND_URL}/favorites`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ movie_id: id, movie_name: name }),
          });

      if (response.ok) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

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
        <div className="movie-actions">
          <button
            className="watch-btn"
            onClick={() => navigate(`/movie/${id}`)}
          >
            Learn more
          </button>
          <button
            className={`favorite-btn ${isFavorite ? "filled" : ""}`}
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
