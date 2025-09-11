"use client";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/useToast";
import { getFixtures } from "@/lib/api/services/fixtures";
import { addPlayer, reportResult } from "@/lib/api/services/admin/actions";
import AdminGuard from "@/components/AdminGuard";

export default function AdminActions() {
  const { showToast } = useToast();
  const [fixtures, setFixtures] = useState([]);
  const [fixtureId, setFixtureId] = useState("");
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  useEffect(() => {
    getFixtures().then((f) => setFixtures(Array.isArray(f) ? f : [])).catch(() => setFixtures([]));
  }, []);

  async function onReport(e) {
    e.preventDefault();
    if (!fixtureId || homeScore === "" || awayScore === "") {
      showToast("Select a fixture and enter both scores", "error");
      return;
    }
    try {
      await reportResult({ fixtureId, homeScore: Number(homeScore), awayScore: Number(awayScore) });
      showToast("Result submitted", "success");
      setHomeScore("");
      setAwayScore("");
    } catch (err) {
      showToast(err.message || "Failed to submit result", "error");
    }
  }

  async function onAddPlayer() {
    try {
      // Example only — wire a real form for name/position/teamId
      await addPlayer({ name: "Demo Player", position: "Midfielder", teamId: "TEAM123" });
      showToast("Player added", "success");
    } catch (err) {
      showToast(err.message || "Failed to add player", "error");
    }
  }

  return (
    <AdminGuard>
      <div className="p-4 space-y-6">
        <h1 className="text-xl font-bold">Admin Actions</h1>

        <section className="space-y-2">
          <h2 className="font-semibold">Report Fixture Result</h2>
          <form onSubmit={onReport} className="space-y-2">
            <select
              className="border p-2 w-full"
              value={fixtureId}
              onChange={(e) => setFixtureId(e.target.value)}
            >
              <option value="">Select a fixture</option>
              {fixtures.map((f) => (
                <option key={f.id} value={f.id}>
                  {(f.homeTeam?.name || f.homeTeam)} vs {(f.awayTeam?.name || f.awayTeam)}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Home"
                className="border p-2 w-full"
                value={homeScore}
                onChange={(e) => setHomeScore(e.target.value)}
              />
              <input
                type="number"
                placeholder="Away"
                className="border p-2 w-full"
                value={awayScore}
                onChange={(e) => setAwayScore(e.target.value)}
              />
            </div>
            <button className="bg-brand-600 text-white px-4 py-2 rounded w-full">Submit Result</button>
          </form>
        </section>

        <section>
          <h2 className="font-semibold mb-2">Quick Add Player</h2>
          <button onClick={onAddPlayer} className="bg-green-600 text-white px-4 py-2 rounded">
            Add Example Player
          </button>
        </section>
      </div>
    </AdminGuard>
  );
}
