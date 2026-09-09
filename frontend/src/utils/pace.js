/** Returns pace in seconds/km. */
export function calculatePace(distanceKm, durationSec) {
  if (!distanceKm || distanceKm <= 0) return null;
  return durationSec / distanceKm;
}

/** Formats a pace (sec/km) as "MM:SS /km". Returns "--:--" for null/invalid. */
export function formatPace(paceSecPerKm) {
  if (paceSecPerKm == null || !isFinite(paceSecPerKm) || paceSecPerKm <= 0) return "--:--";
  const totalSec = Math.round(paceSecPerKm);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${String(sec).padStart(2, "0")}`;
}
