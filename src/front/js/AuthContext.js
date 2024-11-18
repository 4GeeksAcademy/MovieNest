import React, { createContext, useState, useEffect, useContext } from "react";

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Componente que proporciona el contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Mantén el estado del usuario como un objeto

  // Comprobar si hay un token en localStorage y si hay datos de usuario guardados
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      // Si hay un token, intenta obtener el usuario de localStorage
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (savedUser) {
        setUser(savedUser); // Establecer el usuario si está guardado
      }
    }
  }, []);

  // Función para loguear al usuario
  const login = (token, user) => {
    localStorage.setItem("token", token); // Guarda el token en localStorage
    localStorage.setItem("user", JSON.stringify(user)); // Guarda el objeto del usuario
    setUser(user); // Establece el usuario en el estado
    setIsAuthenticated(true); // Marca como autenticado
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token"); // Elimina el token
    localStorage.removeItem("user"); // Elimina los datos del usuario
    setIsAuthenticated(false); // Marca como no autenticado
    setUser(null); // Limpiar el estado del usuario
  };

  // Pasar los valores al contexto
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder a la información del contexto
export const useAuth = () => useContext(AuthContext);
