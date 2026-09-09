import StatCard from "./StatCard";
import { formatDuration } from "../../utils/format";
import { formatPace } from "../../utils/pace";

export default function TodayProgress({ todayActivities }) {
  const durationSec = todayActivities.reduce((s, a) => s + a.durationSec, 0);
  const distanceKm = todayActivities.reduce((s, a) => s + a.distanceKm, 0);
  const calories = todayActivities.reduce((s, a) => s + (a.calories || 0), 0);
  const avgPace = distanceKm > 0 ? durationSec / distanceKm : null;

  const metrics = [
    { label: "Distance", value: distanceKm.toFixed(2), unit: "KM" },
    { label: "Time", value: formatDuration(durationSec) },
    { label: "Pace", value: formatPace(avgPace), unit: "/KM" },
    { label: "Calories", value: calories || 0, unit: "KCAL" },
  ];

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-muted2 mb-3">Today</p>

      {/* Mobile: 2x2 card grid */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {metrics.map((m) => (
          <StatCard key={m.label} label={m.label} value={m.value} unit={m.unit} />
        ))}
      </div>

      {/* Desktop: single row, typography-driven, no per-metric card */}
      <div className="hidden md:flex border border-border rounded-2xl bg-surface divide-x divide-border">
        {metrics.map((m) => (
          <div key={m.label} className="flex-1 px-6 py-5">
            <p className="text-xs text-muted uppercase tracking-wider mb-2">{m.label}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-semibold tracking-tight">{m.value}</span>
              {m.unit && <span className="text-sm text-muted font-medium">{m.unit}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
