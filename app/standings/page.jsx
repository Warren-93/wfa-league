"use client";
import { useEffect, useState } from "react";
import { getStandings } from "@/lib/api/services/standings";
import StandingsTable from "@/components/StandingsTable";

export default function StandingsPage() {
  const [standings, setStandings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getStandings();
        setStandings(data && typeof data === "object" ? data : {});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p className="p-4">Loading standings…</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Standings</h1>
      {Object.keys(standings).length === 0 ? (
        <p>No standings available.</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(standings).map(([division, table]) => (
            <div key={division}>
              <h2 className="font-semibold mb-2">{division}</h2>
              <StandingsTable standings={Array.isArray(table) ? table : []} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
