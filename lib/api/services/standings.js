import api from "../axios";

export async function getStandings() {
  try {
    const res = await api.get("/standings");
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Error fetching standings:", err);
    return [];
  }
}

export async function getStandingsByDivision(divisionId) {
  try {
    const res = await api.get(`/standings/${divisionId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching standings by division:", err);
    throw new Error("Standings not found");
  }
}
