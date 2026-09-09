export default function ProfileStats({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="border border-border rounded-2xl p-4 bg-surface text-center">
        <p className="text-xl font-semibold">{stats.totalDistanceKm.toFixed(1)}</p>
        <p className="text-[11px] text-muted uppercase mt-1">Total KM</p>
      </div>
      <div className="border border-border rounded-2xl p-4 bg-surface text-center">
        <p className="text-xl font-semibold">{stats.totalRuns}</p>
        <p className="text-[11px] text-muted uppercase mt-1">Total Runs</p>
      </div>
      <div className="border border-border rounded-2xl p-4 bg-surface text-center">
        <p className="text-xl font-semibold">{stats.longestRunKm.toFixed(1)}</p>
        <p className="text-[11px] text-muted uppercase mt-1">Longest KM</p>
      </div>
    </div>
  );
}
