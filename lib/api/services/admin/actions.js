import api from "../../axios";

export async function addPlayer({ name, position, teamId }) {
  const res = await api.post("/players", {
    name,
    position,
    teamId,
    avatar: "/logos/avatar-placeholder.png"
  });
  return res.data;
}

export async function reportResult({ fixtureId, homeScore, awayScore }) {
  const res = await api.put(`/fixtures/${fixtureId}/result`, {
    homeScore,
    awayScore,
    status: "finished"
  });
  return res.data;
}
