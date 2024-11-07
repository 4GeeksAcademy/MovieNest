// src/components/Favorites.js
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard"; // Reuse the MovieCard styling
import "../styles/home.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from the API
  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/favorites`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }

    fetchFavorites();
  }, []);

  return (
    <section className="favorites-section">
      <h2 className="text-3xl font-bold mb-6">Your Favorites</h2>
      <div className="favorites-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.movie_id}
            name={movie.movie_name}
            overview={""} // Optionally exclude overview for favorites
            poster={movie.poster} // Adjust backend to send this
          />
        ))}
      </div>
    </section>
  );
};

export default Favorites;
