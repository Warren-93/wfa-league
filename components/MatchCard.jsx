"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function MatchCard({ match, showResult = false, onEdit, onReport }) {
  const { isAdmin } = useAuth();
  const isResult = showResult || (match.homeScore !== undefined && match.awayScore !== undefined);

  return (
    <div className="card p-4 shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 w-1/3">
          {match.homeLogo && (
            <Image src={match.homeLogo} alt={match.homeTeam} width={32} height={32} className="rounded-full" />
          )}
          <span className="font-medium">{match.homeTeam}</span>
        </div>

        <div className="text-center w-1/3">
          {isResult ? (
            <span className="text-lg font-bold">
              {match.homeScore} - {match.awayScore}
            </span>
          ) : (
            <span className="text-sm text-gray-500">
              {new Date(match.date).toLocaleDateString()}{" "}
              {new Date(match.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 w-1/3 justify-end">
          <span className="font-medium">{match.awayTeam}</span>
          {match.awayLogo && (
            <Image src={match.awayLogo} alt={match.awayTeam} width={32} height={32} className="rounded-full" />
          )}
        </div>
      </div>

      <div className="flex justify-between items-center pt-2 border-t">
        <Link href={`/match-centre/${match.id}`} className="text-sm text-brand-600 hover:underline">
          Match Centre →
        </Link>

        {isAdmin && (
          <div className="flex gap-2">
            {!isResult && (
              <button
                onClick={() => onEdit?.(match)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit Fixture
              </button>
            )}
            {isResult ? (
              <button
                onClick={() => onEdit?.(match)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit Result
              </button>
            ) : (
              <button
                onClick={() => onReport?.(match)}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
              >
                Report Result
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
