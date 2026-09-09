import { useNavigate } from "react-router-dom";
import { formatPace } from "../../utils/pace";
import EmptyState from "../common/EmptyState";

const LABELS = {
  fastest_1k: "1K",
  fastest_5k: "5K",
  fastest_10k: "10K",
  longest_run: "Longest Run",
  highest_weekly_distance: "Highest Weekly Distance",
};

export default function PersonalRecordsPreview({ records }) {
  const navigate = useNavigate();

  return (
    <div className="border border-border rounded-2xl bg-surface p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted2">Personal Bests</p>
        <button onClick={() => navigate("/records")} className="text-xs text-muted hover:text-ink transition-colors">
          View all
        </button>
      </div>

      {!records || records.length === 0 ? (
        <div className="py-4">
          <EmptyState title="No record yet" description="Complete a run to start setting personal records." />
        </div>
      ) : (
        <div className="divide-y divide-border mt-2">
          {records.slice(0, 3).map((r) => {
            const isTime = r.valueSec != null;
            return (
              <div key={r.id} className="flex items-center justify-between py-3">
                <p className="text-sm text-muted">{LABELS[r.type] || r.type}</p>
                <p className="text-sm font-semibold">
                  {isTime ? formatPace(r.valueSec) : `${r.valueKm?.toFixed(2)} km`}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
