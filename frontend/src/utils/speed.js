/** Returns speed in km/h. */
export function calculateSpeed(distanceKm, durationSec) {
  if (!durationSec || durationSec <= 0) return 0;
  return distanceKm / (durationSec / 3600);
}
