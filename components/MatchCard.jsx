"use client";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function MatchCard({ fixture, showResult = false, onEdit, onReport }) {
  const { isAdmin } = useAuth();

  if (!fixture) {
    return (
      <div className="card p-4 shadow-sm text-gray-500">
        No fixture data available
      </div>
    );
  }

  const isResult =
    showResult ||
    (fixture.homeScore !== undefined && fixture.awayScore !== undefined);

  return (
    <div className="card p-4 shadow-sm space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 w-1/3">
          {fixture.homeLogo && (
            <Image
              src={fixture.homeLogo}
              alt={fixture.homeTeam}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span className="font-medium">{fixture.homeTeam}</span>
        </div>

        <div className="text-center w-1/3">
          {isResult ? (
            <span className="text-lg font-bold">
              {fixture.homeScore} - {fixture.awayScore}
            </span>
          ) : (
            <span className="text-sm text-gray-500">
              {new Date(fixture.date).toLocaleDateString()}{" "}
              {new Date(fixture.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 w-1/3 justify-end">
          <span className="font-medium">{fixture.awayTeam}</span>
          {fixture.awayLogo && (
            <Image
              src={fixture.awayLogo}
              alt={fixture.awayTeam}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
        </div>
      </div>

      {isAdmin && (
        <div className="flex gap-2">
          {!isResult && (
            <button
              onClick={() => onEdit?.(fixture)}
              className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit Fixture
            </button>
          )}
          {isResult ? (
            <button
              onClick={() => onEdit?.(fixture)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Result
            </button>
          ) : (
            <button
              onClick={() => onReport?.(fixture)}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              Report Result
            </button>
          )}
        </div>
      )}
    </div>
  );
}
