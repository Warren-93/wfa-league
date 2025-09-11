import { getTeamData } from "../../../lib/api/services/teamData";
import Link from "next/link";

export default function TeamPage({ params }) {
  const { teamId } = params;
  const team = getTeamData(teamId);

  if (!team) {
    return <div className="p-4">Team not found</div>;
  }

  return (
    <main className="p-4 space-y-6">
      <section className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-4">
          <img
            src={team.logo || "/logos/team-placeholder.png"}
            alt={team.name}
            className="w-16 h-16 object-cover rounded-full border"
          />
          <div>
            <h1 className="text-2xl font-bold text-brand-700">{team.name}</h1>
            <p className="text-sm text-gray-500">{team.division}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-3">Players</h2>
        <div className="grid gap-3">
          {team.players.map((player) => (
            <Link
              href={`/players/${player.id}`}
              key={player.id}
              className="bg-white rounded-lg shadow p-4 flex items-center gap-3 hover:bg-gray-50"
            >
              <img
                src={player.avatar || "/logos/avatar-placeholder.png"}
                alt={player.name}
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <p className="font-semibold">{player.name}</p>
                <p className="text-sm text-gray-500">{player.position}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
