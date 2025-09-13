import api from "../axios";

export async function getTeams() {
  try {
    const res = await api.get("/teams");
    if (Array.isArray(res.data)) return res.data;
    if (res.data?.teams) return res.data.teams;
    if (res.data?.content) return res.data.content;
    console.log(res);
    return [];
  } catch (err) {
    console.error("Error fetching teams:", err);
    return [];
  }
}


export async function getTeamById(id) {

    try {
    const res = await api.get(`/teams/${id}`)
    if (Array.isArray(res.data)) return res.data;
    if (res.data?.teams) return res.data.teams;
    if (res.data?.content) return res.data.content;
    return [];
  } catch (err) {
    console.error("Error fetching teams:", err);
    return [];
  }
}

export async function createTeam(team) {
  try {
    const res = await api.post("/teams", team);
    return res.data;
  } catch {
    throw new Error("Failed to create team");
  }
}

export async function updateTeam(id, team) {
  try {
    const res = await api.put(`/teams/${id}`, team);
    return res.data;
  } catch {
    throw new Error("Failed to update team");
  }
}

export async function deleteTeam(id) {
  try {
    const res = await api.delete(`/teams/${id}`);
    return res.data;
  } catch {
    throw new Error("Failed to delete team");
  }
}
