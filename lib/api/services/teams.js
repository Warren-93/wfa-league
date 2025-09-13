import api from "../axios";

export async function getTeams() {
  try {
    const res = await api.get("/teams");
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.teams)) return res.data.teams;
    if (Array.isArray(res.data?.content)) return res.data.content;
    return [];
  } catch (err) {
    console.error("Error fetching teams:", err);
    return [];
  }
}

export async function getTeamById(id) {
  try {
    const res = await api.get(`/teams/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching team:", err);
    throw new Error("Team not found");
  }
}

export async function createTeam(team) {
  try {
    const res = await api.post("/teams", team);
    return res.data;
  } catch (err) {
    console.error("Error creating team:", err);
    throw new Error("Failed to create team");
  }
}

export async function updateTeam(id, team) {
  try {
    const res = await api.put(`/teams/${id}`, team);
    return res.data;
  } catch (err) {
    console.error("Error updating team:", err);
    throw new Error("Failed to update team");
  }
}

export async function deleteTeam(id) {
  try {
    const res = await api.delete(`/teams/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting team:", err);
    throw new Error("Failed to delete team");
  }
}
