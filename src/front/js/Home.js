// import React from "react";
// import { useNavigate } from "react-router-dom";

// // export default function Home() {
// //   const navigate = useNavigate();

// //   return (
// //     <div>
// //       <h1>Home</h1>
// //       <p>This is my very amazing website, you can find an access route below</p>
// //       <button
// //         onClick={() => {
// //           navigate("/login");
// //         }}
// //       >
// //         Click to Login
// //       </button>
// //       <a href="/signup">Dont have an account yet? Signup now</a>
// //     </div>
// //   );
// // }

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link rel="stylesheet" href="styles.css">
//     <title>MovieNest</title>
// </head>
// <body>
//     <header>
//         <div class="logo">MovieNest</div>
//         <nav>
//             <ul>
//                 <li>Home</li>
//                 <li>TV Shows</li>
//                 <li>Movies</li>
//                 <li>My List</li>
//             </ul>
//         </nav>
//     </header>

//     <main>
//         <section class="carousel">
//             <h2>Trending Now</h2>
//             <div class="carousel-container">
//                 <div class="carousel-item"><img src="image1.jpg" alt="Movie 1"></div>
//                 <div class="carousel-item"><img src="image2.jpg" alt="Movie 2"></div>
//                 <div class="carousel-item"><img src="image3.jpg" alt="Movie 3"></div>
//                 <div class="carousel-item">
//                     <img src="image1.jpg" alt="Movie 1">
//                     <p>Movie Title 1</p>
//                 </div>
//                 <!-- Add more items as needed fidel-->
//             </div>
//         </section>
//     </main>

//     <footer>
//         <p>&copy; 2024 MovieNest. All rights reserved.</p>
//     </footer>

//     <script src="script.js"></script>
// </body>
// </html>

// const apiKey = '784eff8e954aa3459873a6873f92c196'; // Replace this line once we get our API fidel
// const carouselContainer = document.querySelector('.carousel-container');

// async function fetchMovies() {
//     try {
//         const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
//         const data = await response.json();
//         displayMovies(data.results);
//     } catch (error) {
//         console.error('Error fetching movies:', error);
//     }
// }

// function displayMovies(movies) {
//     carouselContainer.innerHTML = ''; // we clear the existing items 
//     movies.forEach(movie => {
//         const div = document.createElement('div');
//         div.classList.add('carousel-item');
//         div.innerHTML = `
//             <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
//             <p>${movie.title}</p>
//         `;
//         carouselContainer.appendChild(div);
//     });
// }

// // Initial fetch
// fetchMovies();


// // this is just kinda a rough draft code to help us have an idea of things, we can sort the folders properly tomorrow

import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <p>This is my very amazing website, you can find an access route below.</p>
      <button onClick={() => navigate("/login")}>Click to Login</button>
      <a href="/signup">Don't have an account yet? Sign up now</a>
    </div>
  );
}

export default Home;
