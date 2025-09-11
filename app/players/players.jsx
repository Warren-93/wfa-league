import { getPlayerData } from "../../../lib/api/services/playerData";
import Link from "next/link";

export default function PlayerPage({ params }) {
  const { playerId } = params;
  const player = getPlayerData(playerId);

  if (!player) {
    return <div className="p-4">Player not found</div>;
  }

  return (
    <main className="p-4 space-y-6">
      <section className="bg-white rounded-lg shadow p-6 flex gap-6 items-center">
        <img
          src={player.avatar || "/logos/avatar-placeholder.png"}
          alt={player.name}
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <h1 className="text-2xl font-bold text-brand-700">{player.name}</h1>
          <p className="text-sm text-gray-500">{player.position}</p>
          {player.team && (
            <Link
              href={`/teams/${player.team.id}`}
              className="text-sm text-brand-600 hover:underline"
            >
              {player.team.name}
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
