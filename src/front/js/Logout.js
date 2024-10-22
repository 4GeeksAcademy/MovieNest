import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const sessionToken = sessionStorage.getItem("token");
  const localStorageToken = localStorage.getItem("token");

  if (!sessionToken || !localStorageToken) {
    return null;
  }

  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      if (sessionToken || localStorageToken) {
        await fetch(`${process.env.BACKEND_URL}/api/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorageToken ?? sessionToken}`,
          },
        });

        sessionStorage.removeItem("token");
        localStorage.removeItem("token");

        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={onLogout}>Click to Logout</button>;
};

export default Logout;
