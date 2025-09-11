import api from "../axios";

export async function getResults() {
  try {
    const res = await api.get("/results");
    return Array.isArray(res.data) ? res.data : res.data?.results || [];
  } catch {
    return [];
  }
}

export async function getResultById(id) {
  const res = await api.get(`/results/${id}`);
  return res.data;
}

export async function createResult(result) {
  const res = await api.post("/results", result);
  return res.data;
}

export async function updateResult(id, result) {
  const res = await api.put(`/results/${id}`, result);
  return res.data;
}

export async function deleteResult(id) {
  const res = await api.delete(`/results/${id}`);
  return res.data;
}
