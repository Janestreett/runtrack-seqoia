import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { formatDuration } from "../../utils/format";
import { formatPace } from "../../utils/pace";
import EmptyState from "../common/EmptyState";

export default function RecentActivity({ activities }) {
  const navigate = useNavigate();

  if (activities.length === 0) {
    return (
      <EmptyState
        title="No activities yet"
        description="Your recent runs will show up here."
      />
    );
  }

  return (
    <div className="divide-y divide-border border border-border rounded-2xl bg-surface overflow-hidden">
      {activities.slice(0, 5).map((a) => (
        <button
          key={a.id}
          onClick={() => navigate(`/activities/${a.id}`)}
          className="w-full text-left px-5 py-4 hover:bg-ink/[0.04] transition-colors flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-semibold">{a.title}</p>
            <p className="text-xs text-muted mt-0.5">{format(new Date(a.startedAt), "d MMM yyyy")}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{a.distanceKm.toFixed(2)} km</p>
            <p className="text-xs text-muted mt-0.5">
              {formatDuration(a.durationSec)} · {formatPace(a.avgPaceSec)}/km
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
