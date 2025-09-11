import api from "../axios";

export async function getPlayers() {
  try {
    const res = await api.get("/players");
    // always return an array
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data?.players)) return res.data.players;
    if (Array.isArray(res.data?.content)) return res.data.content;
    return [];
  } catch (err) {
    console.error("Error fetching players:", err);
    return []; // fallback so .map never crashes
  }
}


export async function getPlayerById(id) {
  try {
    const res = await api.get(`/players/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching player:", err);
    throw new Error("Player not found");
  }
}

export async function getPlayersByTeam(teamId) {
  try {
    const res = await api.get(`/players/team/${teamId}`);
    return Array.isArray(res.data) ? res.data : res.data?.players || [];
  } catch (err) {
    console.error("Error fetching players for team:", err);
    throw new Error("Failed to load team players");
  }
}

export async function addPlayer(player) {
  try {
    const res = await api.post("/players", player);
    return res.data;
  } catch (err) {
    console.error("Error adding player:", err);
    throw new Error("Failed to add player");
  }
}

export async function updatePlayer(id, updates) {
  try {
    const res = await api.put(`/players/${id}`, updates);
    return res.data;
  } catch (err) {
    console.error("Error updating player:", err);
    throw new Error("Failed to update player");
  }
}

export async function removePlayer(id) {
  try {
    const res = await api.delete(`/players/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error removing player:", err);
    throw new Error("Failed to remove player");
  }
}
