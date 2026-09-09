import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRunStore } from "../../store/runStore";
import { useAuthStore } from "../../store/authStore";
import { activityService } from "../../services/activityService";
import { calculateCalories } from "../../utils/calories";
import { calculateSplits } from "../../utils/splits";
import { calculateElevationGain } from "../../utils/elevation";
import { formatDuration } from "../../utils/format";
import { formatPace } from "../../utils/pace";
import ActivityMap from "../../components/activities/ActivityMap";
import SplitList from "../../components/activities/SplitList";
import Button from "../../components/common/Button";
import { useToast } from "../../components/common/ToastProvider";
import { RUN_STATUS } from "../../config/constants";

export default function RunSummary() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const run = useRunStore();
  const user = useAuthStore((s) => s.user);
  const [saving, setSaving] = useState(false);

  const splits = useMemo(() => calculateSplits(run.gpsPoints), [run.gpsPoints]);
  const elevationGainM = useMemo(() => calculateElevationGain(run.gpsPoints), [run.gpsPoints]);
  const calories = calculateCalories(run.distance, run.duration, user?.weightKg);

  if (run.status !== RUN_STATUS.FINISHED) {
    navigate("/run", { replace: true });
    return null;
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      const startedAt = new Date(run.startTime).toISOString();
      const endedAt = new Date(run.startTime + run.duration * 1000 + run.totalPausedTime).toISOString();

      const activity = await activityService.createActivity({
        title: `Run on ${new Date(run.startTime).toLocaleDateString()}`,
        type: "run",
        distanceKm: run.distance,
        durationSec: Math.round(run.duration),
        avgPaceSec: run.pace,
        avgSpeedKmh: run.speed,
        calories: calories ?? null,
        elevationGainM: elevationGainM ?? null,
        startedAt,
        endedAt,
        gpsPoints: run.gpsPoints,
      });

      showToast("Run saved");
      useRunStore.getState().resetRun();
      navigate(`/activities/${activity.id}`);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-8 flex flex-col gap-6">
      <div>
        <p className="text-xs text-accent font-semibold uppercase tracking-wider mb-2">Run Complete</p>
        <p className="text-stat">{run.distance.toFixed(2)}<span className="text-2xl text-muted ml-2">KM</span></p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="border border-border rounded-2xl p-4 bg-surface">
          <p className="text-xs text-muted uppercase mb-1">Duration</p>
          <p className="text-xl font-semibold">{formatDuration(run.duration)}</p>
        </div>
        <div className="border border-border rounded-2xl p-4 bg-surface">
          <p className="text-xs text-muted uppercase mb-1">Avg Pace</p>
          <p className="text-xl font-semibold">{formatPace(run.pace)} /km</p>
        </div>
        <div className="border border-border rounded-2xl p-4 bg-surface">
          <p className="text-xs text-muted uppercase mb-1">Avg Speed</p>
          <p className="text-xl font-semibold">{run.speed.toFixed(1)} km/h</p>
        </div>
        <div className="border border-border rounded-2xl p-4 bg-surface">
          <p className="text-xs text-muted uppercase mb-1">Calories</p>
          <p className="text-xl font-semibold">
            {calories != null ? `${calories} kcal` : "—"}
          </p>
          {calories == null && <p className="text-[11px] text-muted mt-1">Estimated calories unavailable</p>}
        </div>
        <div className="border border-border rounded-2xl p-4 bg-surface col-span-2">
          <p className="text-xs text-muted uppercase mb-1">Elevation Gain</p>
          <p className="text-xl font-semibold">{elevationGainM != null ? `${elevationGainM} m` : "—"}</p>
        </div>
      </div>

      <ActivityMap gpsPoints={run.gpsPoints} />

      <div>
        <p className="text-sm font-semibold mb-3">Splits</p>
        <SplitList splits={splits} />
      </div>

      <Button fullWidth size="lg" onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : "SAVE RUN"}
      </Button>
    </div>
  );
}
