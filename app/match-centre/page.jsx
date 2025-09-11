"use client";
import { useLiveMatch } from "../../../hooks/useLiveMatch";
import { getFixtures } from "../../../lib/api/services/fixtures";

export default function MatchCentre({ params }) {
  const fixtureId = params.fixtureId;
  const match = getFixtures().find((f) => f.id === fixtureId);

  const { events, score } = useLiveMatch(match);

  if (!match) {
    return <div className="p-4">Match not found</div>;
  }

  return (
    <main className="p-4 space-y-6">
      <section className="bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold">
          {match.homeTeam} vs {match.awayTeam}
        </h1>
        <p className="text-gray-500">{new Date(match.date).toLocaleString()}</p>
        <div className="mt-4 text-2xl font-bold">
          {score.home} - {score.away}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">Live Events</h2>
        <div className="bg-white rounded-lg shadow p-4 space-y-2">
          {events.length === 0 && <p className="text-gray-500">No events yet...</p>}
          {events.map((ev, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span>{ev.minute}'</span>
              <span>{ev.description}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
