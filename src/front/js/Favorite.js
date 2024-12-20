import React, { useEffect, useState } from "react";
import "../styles/home.css";
import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import FavoriteMovieCard from "./FavoriteMovieCard";

const Favorites = () => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (isAuthenticated) {
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

          const data = await response.json();
          setFavorites(data);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      }
    };
    fetchFavorites();
  }, [isAuthenticated]);



  if (!isAuthenticated) {
    return (
      <div>
        <Navbar />
        <section className="favorites-section">
          <h2 className="text-3xl font-bold mb-6">
            You are not logged in yet, please log in to see them :)
          </h2>
          <p>If you don't have an account with us, what are you waiting for?</p>
          <Link to="/signup">
            <button className="btn-signup">Sign Up</button>
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <section className="favorites-section">
        <h2 className="text-3xl font-bold mb-6">Your Favorites</h2>
        <div className="favorites-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <FavoriteMovieCard
              key={movie.movie_id}
              movie_id={movie.movie_id}
              movie_name={movie.movie_name}
            />
          ))}

        </div>
      </section>
    </div>
  );
};

export default Favorites;