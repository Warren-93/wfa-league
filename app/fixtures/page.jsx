"use client";
import { useEffect, useState } from "react";
import { getFixtures } from "@/lib/api/services/fixtures";
import MatchCard from "@/components/MatchCard";

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFixtures();
        setFixtures(Array.isArray(data) ? data : []);
      } catch {
        setFixtures([]);
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fixtures</h1>
      {fixtures.length === 0 ? <p>No fixtures available.</p> : (
        <div className="grid gap-3">
          {fixtures.map((f) => <MatchCard key={f.id} fixture={f} />)}
        </div>
      )}
    </div>
  );
}
