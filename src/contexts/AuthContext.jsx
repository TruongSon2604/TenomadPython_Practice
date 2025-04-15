import React, { createContext, useState, useEffect, useContext } from "react";
import { apiPost } from "../services/apiService";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setError("");
    setLoading(true);
    const data = {
      username: username,
      password: password,
    };
    const rp = await apiPost("/api/v1/login", data);
    if (rp.success) {
      alert(rp.data);
      console.log("rp.data", rp.data.user);
      const user = rp.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      setLoading(false);
      return user;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    error,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
