"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "@/lib/api/services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load persisted session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wfa_auth");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setUser(parsed.user || null);
          setToken(parsed.token || null);
        } catch {
          localStorage.removeItem("wfa_auth");
        }
      }
    }
    setLoading(false);
  }, []);

  async function login(usernameOrEmail, password) {
    const data = await loginUser({ usernameOrEmail, password });
    const authData = { token: data.token, user: data.user };
    localStorage.setItem("wfa_auth", JSON.stringify(authData));
    setUser(data.user);
    setToken(data.token);
    return data;
  }

  async function register(username, email, password, role = "player") {
    const data = await registerUser({ username, email, password, role });
    const authData = { token: data.token, user: data.user };
    localStorage.setItem("wfa_auth", JSON.stringify(authData));
    setUser(data.user);
    setToken(data.token);
    return data;
  }

  function logout() {
    localStorage.removeItem("wfa_auth");
    setUser(null);
    setToken(null);
  }

  const isAdmin = user?.role === "team-admin" || user?.role === "league-admin";

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
