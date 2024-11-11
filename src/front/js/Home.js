import React from "react";
import styles from "/workspaces/MovieNest/src/front/styles/home.css";
import Carousel from "./Carousel";
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom"; // Import both useNavigate and Link
import Favorites from "./Favorite";

export default function Home() {
  const navigate = useNavigate(); 
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <main>
        <section className="welcome-section">
          <h1>Welcome to MovieNest</h1>
          <p>Discover trending movies and shows, tailored just for you!</p>
         
        </section>
        <section className="carousel">
          <Carousel />
        </section>
      </main>
      <footer>
        <p>&copy; 2024 MovieNest. All rights reserved.</p>
      </footer>
    </>
  );
}
