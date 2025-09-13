import { getFixtures } from "@/lib/api/services/fixtures";
import Link from "next/link";

export default function Fixtures() {
  const fixtures = getFixtures();

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-brand-700">Upcoming Fixtures</h1>
      <div className="grid gap-4">
        {fixtures.map((fx) => (
          <div
            key={fx.id}
            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {fx.homeTeam} vs {fx.awayTeam}
              </p>
              <p className="text-sm text-gray-500">{new Date(fx.date).toLocaleString()}</p>
            </div>
            <Link
              href={`/match-centre/${fx.id}`}
              className="text-sm text-brand-600 hover:underline"
            >
              Match Centre →
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
