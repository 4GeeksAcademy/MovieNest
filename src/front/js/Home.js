import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "/workspaces/MovieNest/src/front/styles/home.css";// Link your CSS file here for styling

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <header>
        <div className="logo">MovieNest</div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tvshows">TV Shows</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/mylist">My List</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="welcome-section">
          <h1>Welcome to MovieNest</h1>
          <p>Discover trending movies and shows, tailored just for you!</p>
          <button onClick={() => navigate("/login")} className="login-button">
            Click to Login
          </button>
          <p>
            Don't have an account yet? <Link to="/signup">Signup now</Link>
          </p>
        </section>

        <section className="carousel">
          <h2>Trending Now</h2>
          <div className="carousel-container">
            <div className="carousel-item">
              <img src="image1.jpg" alt="Movie 1" />
              <p>Movie Title 1</p>
            </div>
            <div className="carousel-item">
              <img src="image2.jpg" alt="Movie 2" />
              <p>Movie Title 2</p>
            </div>
            <div className="carousel-item">
              <img src="image3.jpg" alt="Movie 3" />
              <p>Movie Title 3</p>
            </div>
            {/* Add more carousel items as needed */}
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 MovieNest. All rights reserved.</p>
      </footer>
    </>
  );
}







// import React from "react";
//  import { useNavigate } from "react-router-dom";

//  export default function Home() {
//    const navigate = useNavigate();

//    return (
//      <div>
//        <h1>Home</h1>
//        <p>This is my very amazing website, you can find an access route below</p>
//        <button
//         onClick={() => {
//           navigate("/login");
//          }}
//        >
//          Click to Login
//        </button>
//        <a href="/signup">Dont have an account yet? Signup now</a>
//      </div>
//    );
//  }

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




// export default Home;
