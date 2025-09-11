import Link from "next/link";

export default function TeamCard({ team }) {
  return (
    <Link href={`/teams/${team.id}`} className="card flex items-center gap-4 hover:shadow-lg transition">
      <img src={team.logo} alt={team.name} className="w-12 h-12 rounded-full border object-cover" />
      <div>
        <p className="font-semibold">{team.name}</p>
        <p className="text-sm text-gray-500">{team.division}</p>
      </div>
    </Link>
  );
}
