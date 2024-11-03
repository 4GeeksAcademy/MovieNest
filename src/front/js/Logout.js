import React from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error with Logout");
      }

      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      logout();
      navigate("/");
    } catch (error) {
      console.error("Error with logout:", error);
    }
  };

  return "";
};

export default Logout;
