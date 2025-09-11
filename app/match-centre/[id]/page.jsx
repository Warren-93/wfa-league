"use client";
import { useMemo } from "react";
import { getFixtures } from "../../../lib/api/services/fixtures";
import { useLiveMatch } from "../../../hooks/useLiveMatch";

export default function MatchCentre({ params }) {
  const fixtures = getFixtures();
  const match = useMemo(() => fixtures.find(f => f.id === params.id), [fixtures, params.id]);
  const { events, score } = useLiveMatch(match);

  if (!match) return <p>Match not found</p>;

  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-xl font-bold">{match.homeTeam} vs {match.awayTeam}</h1>
        <p className="text-sm text-gray-500">{new Date(match.date).toLocaleString()}</p>
        <div className="mt-2 text-2xl font-bold">{score.home} - {score.away}</div>
      </div>
      <div className="card">
        <h2 className="font-semibold mb-2">Live Events</h2>
        {events.length === 0 ? <p className="text-gray-500">No events yet...</p> : (
          <ul className="space-y-1">
            {events.map((e, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span>{e.minute}'</span>
                <span>{e.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
