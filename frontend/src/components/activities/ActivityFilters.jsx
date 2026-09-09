import { Search } from "lucide-react";
import { DATE_RANGES } from "../../config/constants";

export default function ActivityFilters({ filters, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={filters.q}
          onChange={(e) => onChange({ ...filters, q: e.target.value })}
          placeholder="Search activity title…"
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-surface text-sm focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["all", "run", "walk"].map((type) => (
          <button
            key={type}
            onClick={() => onChange({ ...filters, type })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize whitespace-nowrap border ${
              filters.type === type ? "bg-ink text-bg border-ink" : "border-border text-muted"
            }`}
          >
            {type}
          </button>
        ))}
        <span className="w-px h-4 bg-border mx-1 shrink-0" />
        {DATE_RANGES.map((r) => (
          <button
            key={r.value}
            onClick={() => onChange({ ...filters, range: r.value })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border ${
              filters.range === r.value ? "bg-ink text-bg border-ink" : "border-border text-muted"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
