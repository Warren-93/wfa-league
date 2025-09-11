"use client";
import { useEffect, useState } from "react";
import { getTeams } from "@/lib/api/services/teams";
import TeamCard from "@/components/TeamCard";

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function loadTeams() {
      const data = await getTeams();
      setTeams(Array.isArray(data) ? data : []);
    }
    loadTeams();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>
      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}
