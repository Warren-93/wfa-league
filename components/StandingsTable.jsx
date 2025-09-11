export default function StandingsTable({ standings }) {
  return (
    <table className="w-full bg-white rounded-2xl shadow-card overflow-hidden text-sm">
      <thead className="bg-brand-100">
        <tr>
          <th className="p-2 text-left">#</th>
          <th className="p-2 text-left">Team</th>
          <th className="p-2 text-center">P</th>
          <th className="p-2 text-center">Pts</th>
        </tr>
      </thead>
      <tbody>
        {standings.map((row, i) => (
          <tr key={row.id} className="border-t">
            <td className="p-2">{i + 1}</td>
            <td className="p-2">{row.name}</td>
            <td className="p-2 text-center">{row.played}</td>
            <td className="p-2 text-center font-semibold">{row.points}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
