import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("You have logged out.");
    navigate("/");
  };

  async function fetchMovies(searchQuery = '') {
    const movies = [];
    try {
      // If there's a search query, use search endpoint, otherwise use discover
      const endpoint = searchQuery
        ? 'search/movie'
        : 'discover/movie';
let pageLimit = 10
      // Fetch first 5 pages (100 movies)
      for (let page = 1; page <= pageLimit; page++) {
        const url = new URL(`https://api.themoviedb.org/3/${endpoint}`);
        url.search = new URLSearchParams({
          page: page.toString(),
          ...(searchQuery && { query: searchQuery })
        }).toString();

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        pageLimit = data.total_pages
        movies.push(...data.results);
      }

      setMovies(movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  // Debounce search to prevent too many API calls
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm) {
        fetchMovies(searchTerm);
      } else {
        fetchMovies();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Filter movies client-side for immediate feedback
  const filteredMovies = movies.filter(movie =>
    movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="navbar sticky-nav">
      <div className="logo">
        <h2>
          <Link to="/">MovieNest</Link>
        </h2>
      </div>

      <nav>
        <ul className="nav-links">
          <div className="dropdown">
            <input
              type="text"
              className="form-control"
              placeholder="Search movies by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            />

            {searchTerm && (
              <ul className="dropdown-menu show">
                {filteredMovies.length > 0 ? (
                  filteredMovies.map((movie) => (
                    <li key={movie.id}>
                      <a className="dropdown-item" onClick={() => navigate(`/movie/${movie.id}`)}>{movie.original_title}</a>
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item text-muted">No movies found</li>
                )}
              </ul>
            )}

          </div>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/login" className="login-button">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="signup-button">Signup</Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
