import { getPlayerById } from "../../../lib/api/services/players";

export default function PlayerProfile({ params }) {
  const player = getPlayerById(params.id);
  if (!player) return <p>Player not found</p>;
  return (
    <div className="card flex items-center gap-6">
      <img src={player.avatar} alt={player.name} className="w-20 h-20 rounded-full border" />
      <div>
        <h1 className="text-2xl font-bold">{player.name}</h1>
        <p className="text-sm text-gray-600">{player.position}</p>
        {player.team && <p className="text-sm mt-1">Team: <strong>{player.team.name}</strong></p>}
      </div>
    </div>
  );
}
