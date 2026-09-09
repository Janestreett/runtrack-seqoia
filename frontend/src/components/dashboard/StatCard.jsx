export default function StatCard({ label, value, unit, size = "md" }) {
  return (
    <div className="border border-border rounded-2xl p-5 bg-surface">
      <p className="text-xs text-muted uppercase tracking-wider mb-2">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className={size === "lg" ? "text-stat-sm" : "text-2xl font-semibold"}>{value}</span>
        {unit && <span className="text-sm text-muted font-medium">{unit}</span>}
      </div>
    </div>
  );
}
