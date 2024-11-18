import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";



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
    <div>
      <Navbar />
      <div className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="card p-5 shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <h1 className="text-center mb-4 text-dark">Login</h1>
          {errorMessage && (
            <div className="alert alert-danger text-center" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="mb-3">
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
              className="form-control"
              aria-label="Email Address"
              required
            />
          </div>
          <div className="mb-3">
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
              className="form-control"
              aria-label="Password"
              required
            />
          </div>
          <button onClick={onLogin} className="btn btn-danger w-100">
            Click to Login!
          </button>\

        </div>
      </div>
    </div>
  );
}
