import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.css";

export default function Login() {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onLogin = async () => {
    setErrorMessage("");

    if (!inputValues.email || !inputValues.password) {
      setErrorMessage("Please, fill");
      return;
    }

    try {
      const rawResponse = await fetch(`${process.env.BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValues),
      });

      if (!rawResponse.ok) {
        throw new Error("Try Again");
      }

      const translatedResponse = await rawResponse.json();

      console.log(translatedResponse);

      const token = translatedResponse.access_token;
      const username = translatedResponse.username;

      if (token) {
        login(token, { username });
        navigate("/");
      } else {
        setErrorMessage("Login Failed.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Try Again");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

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
        placeholder="E-mail"
        className="input-field"
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
        placeholder="Password"
        className="input-field"
      />
      <button onClick={onLogin} className="login-button">
        Click to Login!
      </button>
    </div>
  );
}
