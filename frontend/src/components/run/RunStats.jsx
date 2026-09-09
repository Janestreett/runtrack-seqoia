import { formatDuration } from "../../utils/format";
import { formatPace } from "../../utils/pace";

export default function RunStats({ distance, duration, pace, speed }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-xs text-muted uppercase tracking-wider mb-1">Distance</p>
        <p className="text-stat-sm">{distance.toFixed(2)}<span className="text-lg text-muted ml-1">KM</span></p>
      </div>
      <div>
        <p className="text-xs text-muted uppercase tracking-wider mb-1">Time</p>
        <p className="text-stat-sm">{formatDuration(duration)}</p>
      </div>
      <div>
        <p className="text-xs text-muted uppercase tracking-wider mb-1">Pace</p>
        <p className="text-2xl font-semibold">{formatPace(pace)}<span className="text-sm text-muted ml-1">/KM</span></p>
      </div>
      <div>
        <p className="text-xs text-muted uppercase tracking-wider mb-1">Speed</p>
        <p className="text-2xl font-semibold">{speed.toFixed(1)}<span className="text-sm text-muted ml-1">KM/H</span></p>
      </div>
    </div>
  );
}
