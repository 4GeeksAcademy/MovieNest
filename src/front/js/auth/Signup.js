import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";  // Asegúrate de que useAuth tenga una función 'login'
import Navbar from "../Navbar";

const RegisterUser = () => {
  const [inputValues, setInputValues] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();  // Hook de autenticación para hacer login después del registro

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
    e.preventDefault(); // Prevenir el recargado del formulario
    setError(null); // Limpiar el mensaje de error
    setIsLoading(true); // Iniciar estado de carga

    // Validar el formulario antes de continuar
    if (!validateForm()) {
      setIsLoading(false); // Detener el estado de carga si la validación falla
      return;
    }

    try {
      // Hacer el request de registro
      const rawResponse = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputValues),
      });

      if (!rawResponse.ok) {
        const errorResponse = await rawResponse.json();
        console.log("Error from backend:", errorResponse); // Imprimir respuesta de error
        throw new Error(errorResponse.message || "Signup failed");
      }

      const response = await rawResponse.json();
      console.log("Signup success:", response); // Imprimir la respuesta exitosa

      // Loguear automáticamente al usuario después de registrar
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
      console.log("Login success:", loginData); // Imprimir respuesta de login

      // Llamar al login (si tu sistema usa un hook/context para la autenticación)
      login(loginData.token);  // Asumiendo que 'login' guarda el token en el contexto o localStorage

      // Redirigir a la página principal o dashboard
      navigate("/home");  // Cambia esta ruta por la que desees

    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Detener estado de carga
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
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="card-title text-center mb-4 text-dark">Sign Up</h2>

                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Username"
                      value={inputValues.username}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={inputValues.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      value={inputValues.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`btn btn-primary w-100 ${isLoading ? "disabled" : ""}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Signing up...
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
