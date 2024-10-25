import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "/workspaces/MovieNest/src/front/styles/home.css";

export default function Home() {
  return (
    <div className="container">
      <header>
        <div className="logo">MovieNest</div>
        <nav>
          <ul>
            <li>Home</li>
            <li>TV Shows</li>
            <li>Movies</li>
            <li>My List</li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="carousel">
          <h2>Trending Now</h2>
          <div className="carousel-container">
            <div className="carousel-item">
              <img
                src="https://m.media-amazon.com/images/M/MV5BNzQxNzQxNjk5NV5BMl5BanBnXkFtZTgwNTI4MTU0MzE@._V1_.jpg"
                alt="Movie 1"
              />
            </div>
            <div className="carousel-item">
              <img src="#" alt="Movie 2" />
            </div>
            <div className="carousel-item">
              <img src="#" alt="Movie 3" />
            </div>
            <div className="carousel-item">
              <img src="#" alt="Movie 1" />
            </div>
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2024 MovieNest. All rights reserved.</p>
      </footer>
    </div>
  );
}

{
  /* // <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="stylesheet" href="styles.css">
//     <title>MovieNest</title>
// </head>
// <body>
//     <header>
//         
//         </section>
//     </main>

//    

//     <script src="script.js"></script>
// </body>
// </html> */
}

{
  /* const apiKey = '784eff8e954aa3459873a6873f92c196'; // Replace this line once we get our API fidel
 const carouselContainer = document.querySelector('.carousel-container');

 async function fetchMovies() {
     try {
         const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
         const data = await response.json();
         displayMovies(data.results);
     } catch (error) {
         console.error('Error fetching movies:', error);
    }
 }

 function displayMovies(movies) {
     carouselContainer.innerHTML = ''; // we clear the existing items 
     movies.forEach(movie => {
         const div = document.createElement('div');         div.classList.add('carousel-item');
       div.innerHTML = `
           <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
             <p>${movie.title}</p>
        `;
         carouselContainer.appendChild(div);
     });
 }

 Initial fetch
 fetchMovies();


 this is just kinda a rough draft code to help us have an idea of things, we can sort the folders properly tomorrow
 */
}
