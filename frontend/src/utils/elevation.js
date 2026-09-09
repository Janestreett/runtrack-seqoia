const NOISE_THRESHOLD_M = 1.5; // ignore tiny altitude fluctuations from GPS noise

/** Calculates cumulative elevation gain (meters) from a GPS track's altitude readings. */
export function calculateElevationGain(points) {
  const withAltitude = (points || []).filter((p) => typeof p.altitude === "number");
  if (withAltitude.length < 2) return null;

  let gain = 0;
  for (let i = 1; i < withAltitude.length; i++) {
    const delta = withAltitude[i].altitude - withAltitude[i - 1].altitude;
    if (delta > NOISE_THRESHOLD_M) gain += delta;
  }
  return Math.round(gain);
}
