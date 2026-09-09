import { useNavigate } from "react-router-dom";
import EmptyState from "../common/EmptyState";
import Button from "../common/Button";

export default function GoalPreview({ goals }) {
  const navigate = useNavigate();

  if (goals.length === 0) {
    return (
      <EmptyState
        title="No goals yet"
        description="Set a distance, frequency, or pace goal to stay motivated."
        action={
          <Button size="sm" onClick={() => navigate("/goals")}>
            CREATE GOAL
          </Button>
        }
      />
    );
  }

  const goal = goals[0];

  return (
    <div className="border border-border rounded-2xl p-5 bg-surface">
      <p className="text-xs text-muted uppercase tracking-wider mb-3">Active Goal</p>
      <p className="text-sm font-semibold mb-3 capitalize">{goal.type} goal</p>
      <div className="w-full h-2 bg-bg rounded-full overflow-hidden border border-border">
        <div
          className="h-full bg-accent transition-all"
          style={{ width: `${Math.min(100, goal.progressPct || 0)}%` }}
        />
      </div>
      <p className="text-xs text-muted mt-2">
        {goal.actual} / {goal.targetValue} ({goal.progressPct || 0}%)
      </p>
    </div>
  );
}
