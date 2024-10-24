// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Home() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h1>Home</h1>
//       <p>This is my very amazing website, you can find an access route below</p>
//       <button
//         onClick={() => {
//           navigate("/login");
//         }}
//       >
//         Click to Login
//       </button>
//       <a href="/signup">Dont have an account yet? Signup now</a>
//     </div>
//   );
// }

const apiKey = '784eff8e954aa3459873a6873f92c196'; // Replace this line once we get our API fidel
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
        const div = document.createElement('div');
        div.classList.add('carousel-item');
        div.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <p>${movie.title}</p>
        `;
        carouselContainer.appendChild(div);
    });
}

// Initial fetch
fetchMovies();


// this is just kinda a rough draft code to help us have an idea of things, we can sort the folders properly tomorrow