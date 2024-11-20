import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function FavoriteMovieCard({ movie_id, movie_name }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const [shake, setShake] = useState(false); // Para manejar la sacudida del botón
    const [favorited, setFavorited] = useState(false); // Para manejar el efecto de agregado a favoritos

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (isAuthenticated && movie_id) {
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
                    const isFav = favorites.some(favorite => favorite.movie_id === movie_id.toString());
                    setIsFavorite(isFav);
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                }
            }
        };

        checkFavoriteStatus();
    }, [isAuthenticated, movie_id]);

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
                ? await fetch(`${process.env.BACKEND_URL}/api/favorites/${movie_id}`, {
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
                        movie_id: movie_id.toString(),
                        movie_name: movie_name,
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
        <div className="movie-card">
            <div className="movie-info">
                <h3 className="movie-title">{movie_name}</h3>
                <div className="movie-actions">
                    <button
                        className="watch-btn"
                        onClick={() => navigate(`/movie/${movie_id}`)}
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

export default FavoriteMovieCard;
