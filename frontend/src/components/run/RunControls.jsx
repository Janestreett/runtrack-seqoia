import { Play, Pause, Square } from "lucide-react";

export default function RunControls({ status, onStart, onPause, onResume, onFinish }) {
  if (status === "IDLE") {
    return (
      <button
        onClick={onStart}
        className="w-full py-5 rounded-full bg-ink text-bg font-bold text-base tracking-wide flex items-center justify-center gap-2"
      >
        <Play size={20} fill="currentColor" /> START RUN
      </button>
    );
  }

  if (status === "RUNNING") {
    return (
      <div className="flex gap-3">
        <button
          onClick={onPause}
          className="flex-1 py-4 rounded-full border border-border bg-surface font-semibold flex items-center justify-center gap-2"
        >
          <Pause size={18} /> PAUSE
        </button>
        <button
          onClick={onFinish}
          className="flex-1 py-4 rounded-full bg-danger text-white font-semibold flex items-center justify-center gap-2"
        >
          <Square size={18} fill="white" /> FINISH
        </button>
      </div>
    );
  }

  if (status === "PAUSED") {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-center text-sm font-semibold text-warning uppercase tracking-wide">Run Paused</p>
        <div className="flex gap-3">
          <button
            onClick={onResume}
            className="flex-1 py-4 rounded-full bg-ink text-bg font-semibold flex items-center justify-center gap-2"
          >
            <Play size={18} fill="currentColor" /> RESUME
          </button>
          <button
            onClick={onFinish}
            className="flex-1 py-4 rounded-full bg-danger text-white font-semibold flex items-center justify-center gap-2"
          >
            <Square size={18} fill="white" /> FINISH
          </button>
        </div>
      </div>
    );
  }

  return null;
}
