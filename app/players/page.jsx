"use client";
import { useEffect, useState } from "react";
import { getPlayers } from "@/lib/api/services/players";
import PlayerCard from "@/components/PlayerCard";

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPlayers();
        setPlayers(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error loading players:", e);
        setPlayers([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="p-4">Loading players…</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Players</h1>
      {players.length === 0 ? (
        <p>No players available.</p>
      ) : (
        <div className="grid gap-4">
          {players.map((p) => (
            <PlayerCard key={p.id || p._id} player={p} />
          ))}
        </div>
      )}
    </div>
  );
}
