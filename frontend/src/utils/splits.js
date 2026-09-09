import { calculateDistance } from "./distance";

/**
 * Breaks a GPS track into per-kilometer splits.
 * Returns [{ km, timeSec, paceSecPerKm }]
 */
export function calculateSplits(points) {
  if (!points || points.length < 2) return [];

  const splits = [];
  let splitStartIdx = 0;
  let splitStartTime = new Date(points[0].timestamp).getTime();
  let cumulativeKm = 0;
  let kmMarker = 1;

  for (let i = 1; i < points.length; i++) {
    cumulativeKm += calculateDistance(points[i - 1], points[i]);

    if (cumulativeKm >= kmMarker) {
      const timeSec = (new Date(points[i].timestamp).getTime() - splitStartTime) / 1000;
      splits.push({ km: kmMarker, timeSec, paceSecPerKm: timeSec });
      splitStartTime = new Date(points[i].timestamp).getTime();
      splitStartIdx = i;
      kmMarker += 1;
    }
  }

  return splits;
}
