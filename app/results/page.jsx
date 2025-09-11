"use client";
import { useEffect, useState } from "react";
import { getResults } from "@/lib/api/services/results";
import MatchCard from "@/components/MatchCard";

export default function ResultsPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getResults();
        setResults(Array.isArray(data) ? data : []);
      } catch {
        setResults([]);
      }
    })();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      {results.length === 0 ? <p>No results available.</p> : (
        <div className="grid gap-3">
          {results.map((m) => <MatchCard key={m.id} match={m} showResult />)}
        </div>
      )}
    </div>
  );
}
