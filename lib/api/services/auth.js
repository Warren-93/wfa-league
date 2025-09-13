import api from "../axios";

export async function registerUser({ username, email, password, role = "player" }) {
  try {
    const res = await api.post("/auth/register", { username, email, password, role });
    return res.data;
  } catch (err) {
    console.error("Error registering user:", err);
    throw new Error(err.message || "Registration failed");
  }
}

export async function loginUser({ usernameOrEmail, password }) {
  try {
    const res = await api.post("/auth/login", { usernameOrEmail, password });
    return res.data;
  } catch (err) {
    console.error("Error logging in:", err);
    throw new Error(err.message || "Login failed");
  }
}
