import { DATE_RANGES } from "../../config/constants";

export default function StatisticsFilters({ range, onChange }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {DATE_RANGES.map((r) => (
        <button
          key={r.value}
          onClick={() => onChange(r.value)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border ${
            range === r.value ? "bg-ink text-bg border-ink" : "border-border text-muted"
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
