// MET value for running ~ moderate pace; used as a transparent estimate, not a medical claim.
const RUNNING_MET = 9.8;

/**
 * Estimates calories burned using the standard MET formula:
 * kcal = MET * weight(kg) * duration(hours)
 * Returns null when weight is unknown — the UI must show
 * "Estimated calories unavailable" instead of fabricating a number.
 */
export function calculateCalories(distanceKm, durationSec, weightKg) {
  if (!weightKg || weightKg <= 0 || !durationSec) return null;
  const hours = durationSec / 3600;
  return Math.round(RUNNING_MET * weightKg * hours);
}
