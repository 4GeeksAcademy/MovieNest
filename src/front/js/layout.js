import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Private from "./Private";
import RegisterUser from "./Signup";
import MovieDetail from "./MovieDetail"

import Login from "./Login";
import Logout from "./Logout";
import Favorites from "./Favorite ";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Logout />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<RegisterUser />} path="/signup" />
          <Route element={<MovieDetail />} path="/movie/:id" />
          <Route element={<Private />} path="/private" />
          <Route element={<Favorites />} path="/favorites" />
          <Route element={<h1>Not found!</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Layout;
