import { getStandings } from "../../lib/api/services/standings";

export default function StandingsPage() {
  const divisions = ["Warriors Premier League", "Warriors Championship", "Warriors League One"];

  return (
    <main className="p-4 space-y-10">
      <h1 className="text-2xl font-bold text-brand-700">League Standings</h1>
      {divisions.map((division) => {
        const table = getStandings(division);
        return (
          <section key={division}>
            <h2 className="text-lg font-bold mb-3">{division}</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full text-sm">
                <thead className="bg-brand-100">
                  <tr>
                    <th className="px-3 py-2 text-left">#</th>
                    <th className="px-3 py-2 text-left">Team</th>
                    <th className="px-3 py-2 text-center">P</th>
                    <th className="px-3 py-2 text-center">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((team, idx) => (
                    <tr key={team.id} className="border-t">
                      <td className="px-3 py-2">{idx + 1}</td>
                      <td className="px-3 py-2">{team.name}</td>
                      <td className="px-3 py-2 text-center">{team.played}</td>
                      <td className="px-3 py-2 text-center font-semibold">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </main>
  );
}
