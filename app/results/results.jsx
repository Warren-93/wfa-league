import { getResults } from "../../lib/api/services/results";

export default function ResultsPage() {
  const results = getResults();

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-brand-700">Recent Results</h1>
      <div className="grid gap-4">
        {results.map((res) => (
          <div
            key={res.id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {res.homeTeam} {res.homeScore} - {res.awayScore} {res.awayTeam}
              </p>
              <p className="text-sm text-gray-500">{new Date(res.date).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
