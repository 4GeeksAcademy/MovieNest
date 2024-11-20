import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "../styles/navbar.css";
import { FaBars, FaTimes } from "react-icons/fa"; 

const Navbar = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("You have logged out.");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  async function fetchMovies(searchQuery = '') {
    const movies = [];
    try {
      const endpoint = searchQuery ? 'search/movie' : 'discover/movie';
      let pageLimit = 10;

      for (let page = 1; page <= pageLimit; page++) {
        const url = new URL(`https://api.themoviedb.org/3/${endpoint}`);
        url.search = new URLSearchParams({
          page: page.toString(),
          ...(endpoint === 'search/movie' && searchQuery && { query: searchQuery })
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
        if (data.total_pages) {
          pageLimit = Math.min(data.total_pages, 10);
        }
        movies.push(...data.results);
      }

      setMovies(movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

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

  const filteredMovies = movies.filter(movie =>
    movie.original_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <h2>
            <Link to="/">MovieNest</Link>
          </h2>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={`nav-menu ${menuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <input
                type="text"
                className="form-control"
                placeholder="Search movies by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            {!isAuthenticated ? (
              <>
                <li><Link to="/login" className="login-button">Login</Link></li>
                <li><Link to="/signup" className="signup-button">Signup</Link></li>
              </>
            ) : (
              <>
                <li><span>Welcome, <strong>{user?.username}</strong></span></li>
                <li>
                  <button className="logout-button" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
