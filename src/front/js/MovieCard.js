import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function MovieCard({ id, name, overview, poster, voteAverage, releaseDate, Ref }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [shake, setShake] = useState(false);  // Para manejar la sacudida del botón
  const [favorited, setFavorited] = useState(false); // Para manejar el efecto de agregado a favoritos

  const fallbackImage = "https://placehold.co/300x450";

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (isAuthenticated && id) {
        try {
          const response = await fetch(`${process.env.BACKEND_URL}/api/favorites`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const favorites = await response.json();
          // Check if current movie is in favorites
          const isFav = favorites.some(favorite => favorite.movie_id === id.toString());
          setIsFavorite(isFav);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };

    checkFavoriteStatus();
  }, [id, isAuthenticated]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      // Aplicamos la sacudida si no está autenticado
      setShake(true);

      // Restablecer la sacudida después de un corto tiempo
      setTimeout(() => setShake(false), 500);
      return;
    }

    try {
      const response = isFavorite
        ? await fetch(`${process.env.BACKEND_URL}/api/favorites/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        : await fetch(`${process.env.BACKEND_URL}/api/favorites`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movie_id: id.toString(),
            movie_name: name,
          }),
        });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        setFavorited(true);

        // Restablecer el estado de "favorito" después de un corto tiempo
        setTimeout(() => setFavorited(false), 800); // Efecto de 800ms

      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="movie-card" ref={Ref}>
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
            className={`favorite-btn ${isFavorite ? "filled" : ""} ${shake ? "shake" : ""} ${favorited ? "favorited" : ""}`} // Efecto cuando se agrega a favoritos
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
