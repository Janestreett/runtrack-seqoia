export default function GoalProgress({ actual, target, pct }) {
  return (
    <div>
      <div className="w-full h-2 bg-bg rounded-full overflow-hidden border border-border mb-2">
        <div className="h-full bg-accent transition-all" style={{ width: `${Math.min(100, pct || 0)}%` }} />
      </div>
      <p className="text-xs text-muted">{actual} / {target} ({pct || 0}%)</p>
    </div>
  );
}
