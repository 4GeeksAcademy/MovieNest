// import React from "react";
// import styles from "/workspaces/MovieNest/src/front/styles/home.css";
// import Carousel from "./Carousel";
// import { useAuth } from "./AuthContext";
// import Navbar from "./Navbar";
// import Favorites from "./Favorite ";
// import { useNavigate } from "react-router-dom";



// // export default function Home() {
// //   const navigate = useNavigate();
// //   const { isAuthenticated } = useAuth();

// //   return (
// //     <>
// //       <Navbar />
// //       <main>
// //         <section className="welcome-section">
// //           <h1>Welcome to MovieNest</h1>
// //           <p>Discover trending movies and shows, tailored just for you!</p>

          
// //         </section>
// //         <section className="carousel">
// //           <Carousel />
// //         </section>
// //       </main>
// //       <footer>
// //         <p>&copy; 2024 MovieNest. All rights reserved.</p>
// //       </footer>
// //     </>
// //   );
// // }

// export default function Home() {
//   const { isAuthenticated } = useAuth();

//   return (
//     <>
//       <Navbar />
//       <main>
//         <section className="welcome-section">
//           <h1>Welcome to MovieNest</h1>
//           <p>Discover trending movies and shows, tailored just for you!</p>
//           {!isAuthenticated && (
//             <>
//               <button onClick={() => useNavigate("/login")} className="login-button">
//                 Click to Login
//               </button>
//               <p>Don't have an account yet? <Link to="/signup">Signup now</Link></p>
//             </>
//           )}
//         </section>
//         <section className="carousel">
//           <Carousel />
//         </section>
//         {isAuthenticated && (
//           <section className="favorites">
//             <Favorites />
//           </section>
//         )}
//       </main>
//       <footer>
//         <p>&copy; 2024 MovieNest. All rights reserved.</p>
//       </footer>
//     </>
//   );
// }

import React from "react";
import styles from "/workspaces/MovieNest/src/front/styles/home.css";
import Carousel from "./Carousel";
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";
import { useNavigate, Link } from "react-router-dom"; // Import both useNavigate and Link
import Favorites from "./Favorite ";

export default function Home() {
  const navigate = useNavigate(); // Initialize the navigate function here
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <main>
        <section className="welcome-section">
          <h1>Welcome to MovieNest</h1>
          <p>Discover trending movies and shows, tailored just for you!</p>
          {!isAuthenticated && (
            <>
              {/* Use the navigate function within onClick */}
              <button onClick={() => navigate("/login")} className="login-button">
                Click to Login
              </button>
              {/* Use Link to create a navigation link to /signup */}
              <p>Don't have an account yet? <Link to="/signup">Signup now</Link></p>
            </>
          )}
        </section>
        <section className="carousel">
          <Carousel />
        </section>
        {isAuthenticated && (
          <section className="favorites">
            <Favorites />
          </section>
        )}
      </main>
      <footer>
        <p>&copy; 2024 MovieNest. All rights reserved.</p>
      </footer>
    </>
  );
}
