export function simulateMatch(match, onEvent) {
  let minute = 0;
  const timer = setInterval(() => {
    minute += Math.floor(Math.random()*7)+3; // 3-9 mins
    if (minute > 90) { clearInterval(timer); return; }
    const isGoal = Math.random() < 0.35;
    const team = Math.random() < 0.5 ? "home" : "away";
    const description = isGoal ? `GOAL for ${team === "home" ? match.homeTeam : match.awayTeam}!` : `Foul by ${team === "home" ? match.homeTeam : match.awayTeam}`;
    onEvent({ minute, type: isGoal ? "goal" : "info", team, description });
  }, 3000);
  return () => clearInterval(timer);
}
