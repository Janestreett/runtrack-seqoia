import { formatPace } from "../../utils/pace";

export default function SplitList({ splits }) {
  if (!splits || splits.length === 0) {
    return <p className="text-sm text-muted">No split data available.</p>;
  }

  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-surface">
      {splits.map((s) => (
        <div key={s.km} className="flex items-center justify-between px-5 py-3 border-b border-border last:border-b-0">
          <p className="text-sm font-medium">Km {s.km}</p>
          <p className="text-sm text-muted">{formatPace(s.paceSecPerKm)} /km</p>
        </div>
      ))}
    </div>
  );
}
