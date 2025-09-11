"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTeamById } from "@/lib/api/services/teams";
import { getPlayersByTeam } from "@/lib/api/services/players";
import PlayerCard from "@/components/PlayerCard";

export default function TeamDetailPage() {
  const params = useParams(); // expects route: /teams/[id]
  const teamId = params?.id;

  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamId) return;
    (async () => {
      try {
        // Load team + players in parallel
        const [t, p] = await Promise.all([
          getTeamById(teamId),
          getPlayersByTeam(teamId),
        ]);
        setTeam(t || null);
        setPlayers(Array.isArray(p) ? p : []);
      } catch (e) {
        console.error("Error loading team page:", e);
        setTeam(null);
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [teamId]);

  if (loading) return <p className="p-4">Loading team…</p>;
  if (!team) return <p className="p-4">Team not found.</p>;

  return (
    <div className="p-4 space-y-6">
      <header className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {team.logo && <img src={team.logo} alt={team.name} className="w-10 h-10 rounded-full" />}
        <h1 className="text-2xl font-bold">{team.name}</h1>
      </header>

      <section>
        <h2 className="text-lg font-bold mb-2">Players</h2>
        {players.length === 0 ? (
          <p className="text-sm text-gray-600">No players listed.</p>
        ) : (
          <div className="grid gap-3">
            {players.map((p) => (
              <PlayerCard key={p.id || p._id} player={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
