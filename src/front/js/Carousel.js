import React, { useEffect, useState } from "react";
import "../styles/home.css";
import MovieCard from "./MovieCard"

function Carousel() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
        try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie",
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
        console.log('Movie data:', data.results); // For debugging
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="carousel">
      <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
      <div className="carousel-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          movies.slice(0, 10).map(movie => (
            <div className="d-block" key={movie.id}>
              <MovieCard name={movie.original_title} overview={movie.overview} />
            </div>
            
          ))
        }
                       
        
        {/* {movies?.map(movie => (
          <div 
            key={movie.id} 
            className="carousel-item bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative">
              <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.original_title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full">
                ⭐ {movie.vote_average.toFixed(1)}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">{movie.title}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {formatDate(movie.release_date)}
              </p>
              <p className="text-gray-700 text-sm line-clamp-3">
                {movie.overview}
              </p>
              
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Votes: {movie.vote_count}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  movie.adult ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}>
                  {movie.adult ? '18+' : 'All Ages'}
                </span>
              </div>
            </div>
          </div>
        ))}  */}
      </div>
    </section>
  );
}

export default Carousel;