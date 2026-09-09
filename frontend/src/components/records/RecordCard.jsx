import { formatPace } from "../../utils/pace";

const LABELS = {
  fastest_1k: "Fastest 1K",
  fastest_5k: "Fastest 5K",
  fastest_10k: "Fastest 10K",
  longest_run: "Longest Run",
  highest_weekly_distance: "Highest Weekly Distance",
};

export default function RecordCard({ record }) {
  const isTime = record.valueSec != null;

  return (
    <div className="border border-border rounded-2xl p-6 bg-surface">
      <p className="text-xs text-muted uppercase tracking-wider mb-3">{LABELS[record.type] || record.type}</p>
      <p className="text-stat-sm">
        {isTime ? formatPace(record.valueSec) : record.valueKm?.toFixed(2)}
        <span className="text-lg text-muted ml-1">{isTime ? "min" : "km"}</span>
      </p>
    </div>
  );
}
