import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recuperar token y usuario desde el localStorage
    const token = localStorage.getItem("token");
    const savedUser = JSON.parse(localStorage.getItem("user")); // Asegurarse de que el usuario esté guardado

    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(savedUser); // Establecer el usuario recuperado en el estado
    }
  }, []);

  const login = (token, user) => {
    // Guardar el token y el usuario en el localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
