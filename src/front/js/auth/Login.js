import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import '../../styles/login.css';

function Login() {
  const [inputValues, setInputValues] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onLogin = async () => {
    setErrorMessage("");
    setEmailError("");
    setPasswordError("");

    if (!inputValues.email || !inputValues.password) {
      setErrorMessage("Please fill all fields");
      return;
    }

    if (!validateEmail(inputValues.email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (!validatePassword(inputValues.password)) {
      setPasswordError("Password must be at least 6 characters");
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

      console.log(rawResponse)

      if (!rawResponse.ok) {
        const errorData = await rawResponse.json();
        throw new Error(errorData.message || "Login Failed");
      }

      const translatedResponse = await rawResponse.json();
      console.log(translatedResponse)
      const token = translatedResponse.access_token;

      const user = {
        username: translatedResponse.username,

      };

      if (token) {
        login(token, user);
        navigate("/");
      } else {
        setErrorMessage("Login Failed");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "An error occurred during login");
    }
  };


  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-card">
          <h1 className="login-title">Welcome Back</h1>

          {errorMessage && (
            <div className="error-message" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="form-group">
            <input
              type="email"
              name="email"
              className={`login-input ${emailError ? 'is-invalid' : ''}`}
              value={inputValues.email}
              placeholder="Email address"
              onChange={handleInputChange}
            />
            {emailError && <div className="field-error">{emailError}</div>}
          </div>

          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className={`login-input ${passwordError ? 'is-invalid' : ''}`}
              value={inputValues.password}
              placeholder="Password"
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </button>
            {passwordError && <div className="field-error">{passwordError}</div>}
          </div>

          <div className="forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>

          <button onClick={onLogin} className="login-button">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
