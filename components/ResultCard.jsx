export default function ResultCard({ result }) {
  return (
    <div className="card mb-2">
      <p className="font-semibold">
        {result.homeTeam} {result.homeScore} - {result.awayScore} {result.awayTeam}
      </p>
      <p className="text-sm text-gray-500">{new Date(result.date).toLocaleString()}</p>
    </div>
  );
}
