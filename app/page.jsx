"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getFixtures } from "@/lib/api/services/fixtures";
import { getResults } from "@/lib/api/services/results";
import { getStandings } from "@/lib/api/services/standings";
import MatchCard from "@/components/MatchCard";

export default function HomePage() {
  const [fixtures, setFixtures] = useState([]);
  const [results, setResults] = useState([]);
  const [standings, setStandings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [fx, rs, st] = await Promise.all([
          getFixtures(),
          getResults(),
          getStandings()
        ]);
        setFixtures(Array.isArray(fx) ? fx : []);
        setResults(Array.isArray(rs) ? rs : []);
        setStandings(st && typeof st === "object" ? st : {});
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="p-4">Loading league data…</p>;

  return (
    <div className="p-4 space-y-8">
      <section>
        <h2 className="text-lg font-bold mb-3">Upcoming Fixtures</h2>
        {fixtures.length === 0 ? (
          <p>No fixtures scheduled.</p>
        ) : (
          <div className="grid gap-3">
            {fixtures.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">Recent Results</h2>
        {results.length === 0 ? (
          <p>No results yet.</p>
        ) : (
          <div className="grid gap-3">
            {results.map((m) => <MatchCard key={m.id} match={m} showResult />)}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">League Standings</h2>
        {Object.keys(standings).length === 0 ? (
          <p>No standings available.</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(standings).map(([division, table]) => (
              <div key={division} className="bg-white rounded-2xl shadow-card p-3">
                <h3 className="font-semibold mb-2">{division}</h3>
                <table className="w-full border text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Team</th>
                      <th className="p-2 text-center">Played</th>
                      <th className="p-2 text-center">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(table) && table.map((team) => (
                      <tr key={team.id} className="border-t">
                        <td className="p-2">{team.name}</td>
                        <td className="p-2 text-center">{team.played}</td>
                        <td className="p-2 text-center font-bold">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="pt-2">
        <Link href="/fixtures" className="text-brand-600 hover:underline font-medium">View all fixtures →</Link>
      </div>
    </div>
  );
}
