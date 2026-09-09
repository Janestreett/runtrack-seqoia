import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { formatDuration } from "../../utils/format";
import { formatPace } from "../../utils/pace";

export default function ActivityCard({ activity }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/activities/${activity.id}`)}
      className="w-full text-left border border-border rounded-2xl p-5 bg-surface hover:border-ink/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold">{activity.title}</p>
        <p className="text-xs text-muted">{format(new Date(activity.startedAt), "d MMM yyyy, HH:mm")}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-lg font-semibold">{activity.distanceKm.toFixed(2)}</p>
          <p className="text-[11px] text-muted uppercase">km</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{formatDuration(activity.durationSec)}</p>
          <p className="text-[11px] text-muted uppercase">time</p>
        </div>
        <div>
          <p className="text-lg font-semibold">{formatPace(activity.avgPaceSec)}</p>
          <p className="text-[11px] text-muted uppercase">pace /km</p>
        </div>
      </div>
    </button>
  );
}
