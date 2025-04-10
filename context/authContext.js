"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, []);

  const login = (token, refresh) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refresh);
    setIsAuthenticated(true);
    setLoading(false);
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
