import api from "../axios";

export async function getFixtures() {
  try {
    const res = await api.get("/fixtures");
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Error fetching fixtures:", err);
    return [];
  }
}

export async function getFixtureById(id) {
  try {
    const res = await api.get(`/fixtures/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching fixture:", err);
    throw new Error("Fixture not found");
  }
}

export async function createFixture(fixture) {
  try {
    const res = await api.post("/fixtures", fixture);
    return res.data;
  } catch (err) {
    console.error("Error creating fixture:", err);
    throw new Error("Failed to create fixture");
  }
}

export async function updateFixture(id, fixture) {
  try {
    const res = await api.put(`/fixtures/${id}`, fixture);
    return res.data;
  } catch (err) {
    console.error("Error updating fixture:", err);
    throw new Error("Failed to update fixture");
  }
}

export async function deleteFixture(id) {
  try {
    const res = await api.delete(`/fixtures/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting fixture:", err);
    throw new Error("Failed to delete fixture");
  }
}
