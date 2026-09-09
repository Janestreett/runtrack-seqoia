import { Trash2 } from "lucide-react";
import { GOAL_TYPES } from "../../config/constants";

export default function GoalCard({ goal, onDelete }) {
  const meta = GOAL_TYPES.find((g) => g.value === goal.type);

  return (
    <div className="border border-border rounded-2xl p-5 bg-surface">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-semibold capitalize">{goal.type} goal</p>
          <p className="text-xs text-muted mt-0.5 capitalize">{goal.period}ly target</p>
        </div>
        <button onClick={() => onDelete(goal.id)} aria-label="Delete goal" className="text-muted hover:text-danger">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="w-full h-2 bg-bg rounded-full overflow-hidden border border-border mb-2">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${Math.min(100, goal.progressPct || 0)}%` }}
        />
      </div>
      <p className="text-xs text-muted">
        {goal.actual} / {goal.targetValue} {meta?.unit} · {goal.progressPct || 0}%
      </p>
    </div>
  );
}
