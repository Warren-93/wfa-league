import axios from "axios";

const api = axios.create({
  //baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api",
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://warriorsfootballassociation-api.onrender.com/api",
  headers: { "Content-Type": "application/json" }
});

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("wfa_auth");
    if (saved) {
      try {
        const { token } = JSON.parse(saved);
        if (token) config.headers.Authorization = `Bearer ${token}`;
      } catch {
        localStorage.removeItem("wfa_auth");
      }
    }
  }
  return config;
});

// Normalize error messages
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.error ||
      (typeof err?.response?.data === "string" ? err.response.data : "") ||
      err?.message ||
      "Request failed";
    return Promise.reject(new Error(msg));
  }
);

export default api;
