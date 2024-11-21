import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "../Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { GoogleLogin } from "@react-oauth/google";  
import '../../styles/signup.css';

const RegisterUser = () => {
  const [inputValues, setInputValues] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateForm = () => {
    if (!inputValues.email || !inputValues.password || !inputValues.username) {
      setError("Need to fill all the fields");
      return false;
    }
    if (!inputValues.email.includes("@")) {
      setError("Please insert a valid email");
      return false;
    }
    if (inputValues.password.length < 6) {
      setError("Password must be more than 6 digits");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const signupResponse = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValues),
      });

      if (!signupResponse.ok) {
        const errorResponse = await signupResponse.json();
        throw new Error(errorResponse.message || "Signup failed");
      }

      const loginResponse = await fetch(`${process.env.BACKEND_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: inputValues.email,
          password: inputValues.password,
        }),
      });

      if (!loginResponse.ok) {
        const loginError = await loginResponse.json();
        throw new Error(loginError.message || "Login failed after signup");
      }

      const loginData = await loginResponse.json();
      login(loginData.token);
      navigate("/");

    } catch (err) {
      console.error("Error during signup/login:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="register-container">
        <div className="register-card">
          <h1 className="register-title">Sign Up</h1>
          {error && <div className="error-message">{error}</div>}

          <input
            type="text"
            name="username"
            value={inputValues.username}
            placeholder="Username"
            className="register-input"
            onChange={e => setInputValues({ ...inputValues, username: e.target.value })}
          />

          <input
            type="email"
            name="email"
            value={inputValues.email}
            placeholder="Email"
            className="register-input"
            onChange={e => setInputValues({ ...inputValues, email: e.target.value })}
          />

          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={inputValues.password}
              placeholder="Password"
              className="register-input"
              onChange={e => setInputValues({ ...inputValues, password: e.target.value })}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button onClick={handleRegister} className="register-button" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Componente GoogleLogin comentado */}
          {/* 
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => setError("Google signup failed")}
            clientId="693442981264-1knfjdrd93nirvo85re8qhl7qguhgce0.apps.googleusercontent.com" 
          />
          */}
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
