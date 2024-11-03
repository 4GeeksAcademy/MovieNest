
import React from "react";
import ReactDOM from "react-dom";


import { AuthProvider } from "./AuthContext";
import Layout from "./layout";


ReactDOM.render(
  <AuthProvider>
    <Layout />
  </AuthProvider>,
  document.querySelector("#app")
);
