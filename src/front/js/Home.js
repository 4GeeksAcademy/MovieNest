import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "/workspaces/MovieNest/src/front/styles/home.css";
import Carousel from "./Carousel";
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";

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
