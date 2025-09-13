import api from "../axios";

export async function getResults() {
  try {
    const res = await api.get("/results");
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Error fetching results:", err);
    return [];
  }
}

export async function getResultById(id) {
  try {
    const res = await api.get(`/results/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching result:", err);
    throw new Error("Result not found");
  }
}

export async function createResult(result) {
  try {
    const res = await api.post("/results", result);
    return res.data;
  } catch (err) {
    console.error("Error creating result:", err);
    throw new Error("Failed to create result");
  }
}

export async function updateResult(id, result) {
  try {
    const res = await api.put(`/results/${id}`, result);
    return res.data;
  } catch (err) {
    console.error("Error updating result:", err);
    throw new Error("Failed to update result");
  }
}

export async function deleteResult(id) {
  try {
    const res = await api.delete(`/results/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting result:", err);
    throw new Error("Failed to delete result");
  }
}
