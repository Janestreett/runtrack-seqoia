import { useMemo, useState } from "react";
import { format, startOfWeek, addDays, startOfMonth, addWeeks, isSameWeek } from "date-fns";
import DistanceChart from "./DistanceChart";

export default function WeeklyChart({ activities }) {
  const [mode, setMode] = useState("weekly");

  const weeklyData = useMemo(() => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    return Array.from({ length: 7 }).map((_, i) => {
      const day = addDays(start, i);
      const dayTotal = activities
        .filter((a) => format(new Date(a.startedAt), "yyyy-MM-dd") === format(day, "yyyy-MM-dd"))
        .reduce((s, a) => s + a.distanceKm, 0);
      return { label: format(day, "EEE"), distanceKm: dayTotal };
    });
  }, [activities]);

  const monthlyData = useMemo(() => {
    const start = startOfMonth(new Date());
    return Array.from({ length: 4 }).map((_, i) => {
      const weekStart = addWeeks(start, i);
      const weekTotal = activities
        .filter((a) => isSameWeek(new Date(a.startedAt), weekStart, { weekStartsOn: 1 }))
        .reduce((s, a) => s + a.distanceKm, 0);
      return { label: `Wk ${i + 1}`, distanceKm: weekTotal };
    });
  }, [activities]);

  return (
    <div className="border border-border rounded-2xl p-5 bg-surface">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold">Distance</p>
        <div className="flex bg-bg rounded-full p-0.5 border border-border">
          {["weekly", "monthly"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1 text-xs rounded-full font-medium capitalize transition-colors ${
                mode === m ? "bg-ink text-bg" : "text-muted"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <DistanceChart data={mode === "weekly" ? weeklyData : monthlyData} />
    </div>
  );
}
