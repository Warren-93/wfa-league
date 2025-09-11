import Link from "next/link";

export default function PlayerCard({ player }) {
  return (
    <Link href={`/players/${player.id}`} className="card flex items-center gap-3 hover:shadow-lg transition mb-2">
      <img src={player.avatar} alt={player.name} className="w-10 h-10 rounded-full border object-cover" />
      <div>
        <p className="font-medium">{player.name}</p>
        <p className="text-xs text-gray-500">{player.position}</p>
      </div>
    </Link>
  );
}
