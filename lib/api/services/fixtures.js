import api from "../axios";

export async function getFixtures() {
  try {
    const res = await api.get("/fixtures");
    console.log(res);
    return Array.isArray(res.data) ? res.data : res.data?.matches || [];
  } catch {
    return [];
  }
}

export async function getFixtureById(id) {
  const res = await api.get(`/fixtures/${id}`);
  return res.data;
}

export async function createFixture(fixture) {
  const res = await api.post("/fixtures", fixture);
  console.log(res);
  return res.data;
}

export async function updateFixture(id, fixture) {
  const res = await api.put(`/fixtures/${id}`, fixture);
  return res.data;
}

export async function deleteFixture(id) {
  const res = await api.delete(`/fixtures/${id}`);
  return res.data;
}
