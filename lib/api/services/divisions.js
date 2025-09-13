import api from "../axios";

export async function getDivisions() {
  try {
    const res = await api.get("/divisions");
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Error fetching divisions:", err);
    return [];
  }
}

export async function getDivisionById(id) {
  try {
    const res = await api.get(`/divisions/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching division:", err);
    throw new Error("Division not found");
  }
}

export async function createDivision(division) {
  try {
    const res = await api.post("/divisions", division);
    return res.data;
  } catch (err) {
    console.error("Error creating division:", err);
    throw new Error("Failed to create division");
  }
}

export async function updateDivision(id, division) {
  try {
    const res = await api.put(`/divisions/${id}`, division);
    return res.data;
  } catch (err) {
    console.error("Error updating division:", err);
    throw new Error("Failed to update division");
  }
}

export async function deleteDivision(id) {
  try {
    const res = await api.delete(`/divisions/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting division:", err);
    throw new Error("Failed to delete division");
  }
}
