import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "../Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  return (
    <div>
      <Navbar />
      <div className="register-container">
        <div className="register-card">
          <h1 className="register-title">Create Your Account</h1>

          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <input
              type="text"
              name="username"
              className="register-input"
              placeholder="Username"
              value={inputValues.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              className="register-input"
              placeholder="Email"
              value={inputValues.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className="register-input"
              placeholder="Password"
              value={inputValues.password}
              onChange={handleInputChange}
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
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
