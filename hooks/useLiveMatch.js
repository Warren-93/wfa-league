"use client";
import { useEffect, useState } from "react";
import { simulateMatch } from "../lib/match/simulateMatch";

export default function useLiveMatch(match) {
  const [events, setEvents] = useState([]);
  const [score, setScore] = useState({ home: 0, away: 0 });

  useEffect(() => {
    if (!match) return;

    const stop = simulateMatch(match, (event) => {
      setEvents((prev) => [event, ...prev]);
      if (event.type === "goal") {
        setScore((prev) =>
          event.team === "home"
            ? { ...prev, home: prev.home + 1 }
            : { ...prev, away: prev.away + 1 }
        );
      }
    });

    return () => stop();
  }, [match]);

  return { events, score };
}
