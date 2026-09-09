import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { activityService } from "../../services/activityService";
import { calculateSplits } from "../../utils/splits";
import { formatDuration } from "../../utils/format";
import { formatPace } from "../../utils/pace";
import ActivityMap from "../../components/activities/ActivityMap";
import PaceChart from "../../components/activities/PaceChart";
import ElevationChart from "../../components/activities/ElevationChart";
import SplitList from "../../components/activities/SplitList";
import Skeleton from "../../components/common/Skeleton";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import { useToast } from "../../components/common/ToastProvider";

export default function ActivityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const data = await activityService.getActivity(id);
        setActivity(data);
        setTitle(data.title);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const splits = useMemo(() => calculateSplits(activity?.gpsPoints || []), [activity]);

  const saveTitle = async () => {
    const updated = await activityService.updateActivity(id, { title });
    setActivity((a) => ({ ...a, title: updated.title }));
    setEditing(false);
    showToast("Activity updated");
  };

  const handleDelete = async () => {
    await activityService.deleteActivity(id);
    showToast("Activity deleted");
    navigate("/activities");
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 flex flex-col gap-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-64" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  if (notFound) {
    return <EmptyState title="Activity not found" description="This activity may have been deleted." />;
  }

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 flex flex-col gap-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {editing ? (
            <div className="flex items-center gap-2">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-border rounded-lg px-3 py-1.5 text-lg font-semibold flex-1"
              />
              <button onClick={saveTitle} aria-label="Save title" className="text-accent"><Check size={20} /></button>
              <button onClick={() => setEditing(false)} aria-label="Cancel edit" className="text-muted"><X size={20} /></button>
            </div>
          ) : (
            <h1 className="text-2xl font-bold">{activity.title}</h1>
          )}
          <p className="text-sm text-muted mt-1">{format(new Date(activity.startedAt), "EEEE, d MMMM yyyy · HH:mm")}</p>
        </div>
        {!editing && (
          <div className="flex gap-2 shrink-0">
            <button onClick={() => setEditing(true)} aria-label="Edit activity" className="p-2 rounded-full border border-border text-muted hover:text-ink">
              <Pencil size={16} />
            </button>
            <button onClick={() => setConfirmDelete(true)} aria-label="Delete activity" className="p-2 rounded-full border border-border text-muted hover:text-danger">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Distance" value={`${activity.distanceKm.toFixed(2)} km`} />
        <Stat label="Duration" value={formatDuration(activity.durationSec)} />
        <Stat label="Avg Pace" value={`${formatPace(activity.avgPaceSec)} /km`} />
        <Stat label="Avg Speed" value={`${(activity.avgSpeedKmh || 0).toFixed(1)} km/h`} />
        <Stat label="Calories" value={activity.calories ? `${activity.calories} kcal` : "—"} />
        <Stat label="Elevation" value={activity.elevationGainM != null ? `${Math.round(activity.elevationGainM)} m` : "—"} />
      </div>

      <ActivityMap gpsPoints={activity.gpsPoints} />

      <div>
        <p className="text-sm font-semibold mb-3">Pace</p>
        <PaceChart splits={splits} />
      </div>

      <div>
        <p className="text-sm font-semibold mb-3">Elevation</p>
        <ElevationChart gpsPoints={activity.gpsPoints} />
      </div>

      <div>
        <p className="text-sm font-semibold mb-3">Splits</p>
        <SplitList splits={splits} />
      </div>

      <Modal open={confirmDelete} title="Delete this activity?" onClose={() => setConfirmDelete(false)}>
        <p className="text-sm text-muted mb-6">This will permanently remove the activity and its GPS data.</p>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => setConfirmDelete(false)}>Cancel</Button>
          <Button variant="danger" fullWidth onClick={handleDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="border border-border rounded-2xl p-4 bg-surface">
      <p className="text-[11px] text-muted uppercase mb-1">{label}</p>
      <p className="text-base font-semibold">{value}</p>
    </div>
  );
}
