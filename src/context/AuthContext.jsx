import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState({
    isAuthenticated: localStorage.getItem("authToken") !== null,
    role: localStorage.getItem("userRole") || null,
  });

  const login = (token, role) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", role);
    setIsAuthenticated({ isAuthenticated: true, role });
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    setIsAuthenticated({ isAuthenticated: false, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
