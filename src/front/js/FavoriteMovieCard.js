import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function FavoriteMovieCard({ movie_id, movie_name }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);

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
        if (!isAuthenticated) return;

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

export default FavoriteMovieCard;
