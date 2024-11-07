
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard"; 
import "../styles/home.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    async function fetchFavorites() {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/favorites`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        console.log(`${localStorage.getItem("token")}`)
        
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
            overview={""} 
            poster={movie.poster} 
          />
        ))}
      </div>
    </section>
  );
};

// const fetchFavorites = async () => {
//   try {
//     const response = await fetch("http://your-api-url/favorites"); // Replace with the correct URL
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json(); // This line will throw an error if the response is not JSON
//     setFavorites(data);
//   } catch (error) {
//     console.error("Error fetching favorites:", error);
//   }
// };

// const fetchFavorites = async () => {
//   try {
//     const response = await fetch("http://your-api-url/favorites");
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     // Attempt to parse JSON only if response is valid
//     const contentType = response.headers.get("content-type");
//     if (contentType && contentType.includes("application/json")) {
//       const data = await response.json();
//       setFavorites(data);
//     } else {
//       throw new Error("Received non-JSON response from server");
//     }
//   } catch (error) {
//     console.error("Error fetching favorites:", error);
//   }
// };


export default Favorites;
