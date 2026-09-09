const ERROR_MESSAGES = {
  GPS_DENIED: "Location access denied. Enable GPS permission to track your run.",
  GPS_UNAVAILABLE: "GPS signal unavailable. Move to an open area.",
  GPS_WEAK: "Weak GPS signal. Accuracy may be reduced.",
};

const WEAK_ACCURACY_THRESHOLD_M = 20;

function StatusPill({ tone, label }) {
  const dot = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    muted: "bg-muted",
  }[tone];

  const text = {
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    muted: "text-muted",
  }[tone];

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface">
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      <span className={`text-[11px] font-semibold uppercase tracking-wider ${text}`}>{label}</span>
    </div>
  );
}

export default function LocationStatus({ error, accuracy }) {
  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <StatusPill tone="danger" label="Location Error" />
        <p className="text-xs text-muted max-w-xs">{ERROR_MESSAGES[error] || "GPS issue detected."}</p>
      </div>
    );
  }

  if (accuracy == null) {
    return (
      <div className="flex justify-center">
        <StatusPill tone="muted" label="Searching" />
      </div>
    );
  }

  if (accuracy > WEAK_ACCURACY_THRESHOLD_M) {
    return (
      <div className="flex flex-col items-center gap-1.5">
        <StatusPill tone="warning" label="GPS Weak" />
        <p className="text-[11px] text-muted">±{Math.round(accuracy)}m accuracy</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-1.5">
      <StatusPill tone="success" label="GPS Ready" />
      <p className="text-[11px] text-muted">±{Math.round(accuracy)}m accuracy</p>
    </div>
  );
}
