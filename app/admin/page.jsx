"use client";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/AdminGuard";
import { getTeams } from "@/lib/api/services/teams";
import { getFixtures } from "@/lib/api/services/fixtures";

export default function AdminDashboard() {
  const [teams, setTeams] = useState([]);
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    getTeams().then((t) => setTeams(Array.isArray(t) ? t : [])).catch(() => setTeams([]));
    getFixtures().then((f) => setFixtures(Array.isArray(f) ? f : [])).catch(() => setFixtures([]));
  }, []);

  return (
    <AdminGuard>
      <div className="p-4 space-y-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>

        <section>
          <h2 className="font-semibold mb-2">Teams</h2>
          {teams.length === 0 ? <p className="text-gray-500">No teams available</p> : (
            <ul className="list-disc pl-4">
              {teams.map((t) => <li key={t.id}>{t.name}</li>)}
            </ul>
          )}
        </section>

        <section>
          <h2 className="font-semibold mb-2">Fixtures</h2>
          {fixtures.length === 0 ? <p className="text-gray-500">No fixtures available</p> : (
            <ul className="list-disc pl-4">
              {fixtures.map((m) => (
                <li key={m.id}>
                  {(m.homeTeam?.name || m.homeTeam)} vs {(m.awayTeam?.name || m.awayTeam)}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AdminGuard>
  );
}
