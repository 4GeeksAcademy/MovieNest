import React from "react";
import { useState } from "react";

export const registerUser = async () => {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });

  try {
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Usuario registrado:", data);
      localStorage.setItem("access_token", data.access_token); // Guarda el token para futuras peticiones
    } else {
      const errorData = await response.json();
      console.error("Error al registrar el usuario:", errorData);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

return (
  <div>
    <h1>Login</h1>

    <input
      type="email"
      onChange={(event) => {
        const { value } = event.target;
        setInputValues((prevState) => ({
          ...prevState,
          email: value,
        }));
      }}
      value={inputValues.email}
      placeholder="email"
    />
    <input
      type="password"
      onChange={(event) => {
        const { value } = event.target;
        setInputValues((prevState) => ({
          ...prevState,
          password: value,
        }));
      }}
      value={inputValues.password}
      placeholder="password"
    />
    <button onClick={onLogin}>Click to Login!</button>
  </div>
);
