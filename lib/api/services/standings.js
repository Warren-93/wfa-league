import api from "../axios";

export async function getStandings() {
  try {
    const res = await api.get("/standings");
    return res.data || {};
  } catch {
    return {};
  }
}

export async function getStandingsByDivision(divisionId) {
  const res = await api.get(`/standings/${divisionId}`);
  return res.data;
}
